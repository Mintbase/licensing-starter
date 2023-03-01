import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Loader } from "@/components/Loader";
import { NO_RAMP_API_KEY, NO_RAMP_KYC_ENDPOINT, useNoRamp, useNoRampEvent } from "@/hooks/useNoRamp";
import { LicenseToken, tokenQuery, useToken } from "@/hooks/useToken";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useNearPrice } from "@mintbase-js/react";
import { NextPageContext } from "next";
import Head from "next/head";
import { useCallback } from "react";

// create a new client for SSR
export const client = new ApolloClient({
  uri: "https://graph.mintbase.xyz/testnet",
  cache: new InMemoryCache(),
  ssrMode: true
});

type Props = {
  tokenId: string
  kycId: string
  token: LicenseToken,
}

export default function BuyWithFiatPage({ tokenId, kycId }: Props) {
  const { token, loading: tokenLoading } = useToken(tokenId as string);
  const { nearPrice } = useNearPrice();
  const priceUSD = (Number(token.nearPrice) * Number(nearPrice)).toFixed(2);
  const { error, loading: noRampLoading, priceId } = useNoRamp(
    tokenId as string,
    kycId,
    'benipsen.testnet',
    priceUSD
  );

  const onEvent = useCallback((eventData: any) => {
    console.log('eventData', eventData.type, eventData)
  }, []);

  useNoRampEvent({
    event: 'onPayment',
    handler: onEvent,
  });
  const isLoading = tokenLoading || noRampLoading

  return (
    <>
      <Head>
        <title>Creative Licensing Platform Starter</title>
        <meta
          name="description"
          content="A creative licensing platform that works on NEAR protocol, powered by Mintbase."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="detail-view fiat-form">
        {isLoading
          ? <Loader />
          : (
              <div>
                <h5>Purchase License</h5>
                <div className="thumbnail" style={{backgroundImage: `url(${token.media})`}}>

                </div>
                <div className="license-info">
                  <h4>{token?.title}</h4>
                  <h1>{token.photographer}</h1>
                  <h3><span>${priceUSD} USD</span></h3>
                </div>
                <iframe
                  src={`https://testnet.on-noramp.com/embed/payments/app_2TtUkzu8ysYF3qlc6HZSoT?price_id=${priceId}&theme=light`}
                  frameBorder="0"
                  height="220"
                  width="100%"
                />
              </div>
            )

        }
      </main>
      <Footer />
    </>
  );
}

// TODO: server side fetch is probably better
//      possible necessary for noramp api keys
export const getServerSideProps = async ({ query }: NextPageContext) => {

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

  // get kyc for the "seller"
  // TODO, talk more to noramp about this.
  // Can we invoke multiple contract calls?
  // Call payouts and royalties
  const response = await fetch(NO_RAMP_KYC_ENDPOINT, {
    method: "POST",
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${NO_RAMP_API_KEY}`,
    },
    body: JSON.stringify({
      identifier: token.owner
    })
  });

  const { data: kyc } = await response.json();

  return {
    props: {
      kycId: kyc.id,
      tokenId: query.tokenId,
      token,
    }
  }
}