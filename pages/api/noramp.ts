import { NO_RAMP_API_KEY, NO_RAMP_KYC_ENDPOINT, NO_RAMP_PRICE_ENDPOINT, NO_RAMP_TRIGGER_ID } from "@/hooks/useNoRamp";
import { NextApiRequest, NextApiResponse } from "next";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { tokenQuery } from "@/hooks/useToken";
import { utils } from "near-api-js";

export const client = new ApolloClient({
  uri: "https://graph.mintbase.xyz/testnet",
  cache: new InMemoryCache(),
  ssrMode: true
});

const fetchNoRampData = async (endpoint: string, body: object) => {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${NO_RAMP_API_KEY}`,
      },
      body: JSON.stringify(body)
    });

    return await response.json();
  } catch (e) {
    console.error(`Error communicating with noramp ${e}`);
  }
}


export default async function norampEndpoint(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;

  try {
    // fetch the token
    const { data } = await client.query({
      query: tokenQuery,
      variables: {
        contractId: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        token_id: query.tokenId,
      },
      context: {
        headers: { "mb-api-key": "anon" },
      },
    });

    const token = data.mb_views_nft_tokens[0];

    // calculate amount
    const yoctoPrice = token?.listings.length
      ? token.listings[0].price
        .toLocaleString()
        .replaceAll(',','')
        .replaceAll('.','')
      : 0

    const tokenPriceInNear = utils.format.formatNearAmount(yoctoPrice);

    // get usd price
    const nearPriceReq = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=near%2Cusn%2Cjumbo-exchange&include_last_updated_at=true&vs_currencies=usd%2Ceur%2Ccny');
    const nearPriceData = await nearPriceReq.json() as any;
    const amount = Number(Number(tokenPriceInNear) * Number(nearPriceData.near.usd)).toFixed(2);

    // get kyc for the "seller"
    // TODO, talk more to noramp about this.
    // Can we invoke multiple contract calls?
    // Call payouts and royalties
    const { data: kyc } = await fetchNoRampData(NO_RAMP_KYC_ENDPOINT, {
      identifier: token.owner
    })

    if (!kyc || !kyc.id) {
      // likely issues to to KYC, return false
      res.status(200).send({
        noFiat: true
      });
      return;
    }

    const priceConfig = {
      "currency": "usd",
      "trigger_id": NO_RAMP_TRIGGER_ID,
      trigger_data: {
        params_data: {
          token_id: query.tokenId,
          receiver_id: query.to,
          // FIXME: we may have to fetch this via RPC call unless we change contract
          // approval_id: 123,
        },
      },
      "kyc_id": kyc.id,
      "amount": Number(amount)
    };

    // fetch the price id as well
    const { data: pricing } = await fetchNoRampData(NO_RAMP_PRICE_ENDPOINT, priceConfig);

    if (!pricing || !pricing.id) {
      // likely issues to to KYC, return false
      res.status(200).send({
        noFiat: true
      })
      return;
    }

    res.status(200).send({
      priceId: pricing.id,
      amount
    })

  } catch (err) {
    console.error(err);
    res.status(200).send({
      noFiat: true
    })
  }
}