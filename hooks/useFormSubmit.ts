import { useWallet } from "@mintbase-js/react";
import { mint, depositStorage, list, execute } from "@mintbase-js/sdk";
import { useState } from "react";
import { FormFields } from "./useFormFields";
import { utils } from 'near-api-js';

type UseFormSubmitReturn = {
  isInFlight: boolean
  handleSubmit: (fd: FormData, state: FormFields) => Promise<void>
}

type Reference = { id: string; media_hash: string };

export const useFormSubmit = (): UseFormSubmitReturn => {
  const contract = process?.env?.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const { selector, activeAccountId } = useWallet();
  const [isInFlight, setDataInFlight] = useState(false);

  const handleSubmit = async (fd: FormData, state: FormFields) => {
    setDataInFlight(true);
    const wallet = await selector.wallet();

    try {
      // generate a new token id
      const tokenId = Number(Math.random().toString().slice(2, 19));

      // set the photographer as an attribute
      fd.set("contractId", contract || '');
      fd.set("tokenId", tokenId.toString());
      fd.set("addToSearch", 'true');
      fd.set(
        "attributes",
        JSON.stringify([
          {
            trait_type: "photographer",
            display_type: "string",
            value: state.photographer,
          },
          {
            trait_type: "category",
            display_type: "string",
            value: state.category,
          }
        ])
      );

      // add minter and revenue participants (searchable!)
      fd.set("minter", activeAccountId as string);

      // filter out usable splits
      const { splits, percentage } = parseUsableBasisPointAdjustedRoyalty(
        (state?.royalties || [])
      )

      // no need to actually royalties
      if (Object.keys(splits).length) {
        fd.set("revenueSharing", JSON.stringify(splits));
        fd.delete('royalties');
      }

      // create the post request
      const postRequest = await fetch("https://ar.mintbase.xyz/reference",
        {
          method: "POST",
          headers: { "mb-api-key": "licensing-example" },
          body: fd,
        }
      );

      const reference: Reference = await postRequest.json();

      // create the minting call
      const mintCall = mint({
        metadata: { reference: reference.id, media: reference.media_hash },
        ownerId: activeAccountId as string,
        options: {
          // always use the max 50% baseline
          royaltyPercentage: percentage,
          splits,
        },
        noSplits: true,
        tokenIdsToMint: [tokenId],
      });

      const depositStorageCall = depositStorage({});
      const listCall = list({
        price: utils.format.parseNearAmount(state.price.toString()) as string,
        tokenId: tokenId.toString(),
      });

      // execute the mint
      await execute({ wallet, callbackUrl: process?.env?.NEXT_PUBLIC_CALLBACK_URL },
        mintCall,
        depositStorageCall,
        listCall
      );

      setDataInFlight(false);
    } catch (e) {
      setDataInFlight(false);
      console.error(e);
    }
  };

  return {
    handleSubmit,
    isInFlight
  };
}

export const parseUsableBasisPointAdjustedRoyalty = (
  royalties: { account: string, percent: number }[] = [],
  // minter: string,
  // needsRoyaltyAdjusted: boolean = false
): {
  splits: Record<string, number>,
  percentage: number
} => {
  // parse usable data with variables as required
  // const basisMultiplier = needsRoyaltyAdjusted ? 2 : 1;
  const usableSplits = royalties
    .filter(entry => entry.account > '' && Number(entry.percent) > 0)
    .map(entry => ({
      account: entry.account,
      // percent: Number(entry.percent),
      // tenths: Number(entry.percent) / 100,
      basis: Number(entry.percent) * 100 // * basisMultiplier
    }))

    const percentage = usableSplits.reduce((sum, sp) => sum + sp.basis, 0)
    const splits: Record<string, number> = usableSplits.reduce((build, sp) => ({
      ...build,
      // from the percentage, recompute usable split as % of the total so it adds up to 10k
      [sp.account]: Math.floor((sp.basis * 10_000) / percentage)
    }), {})

    // compute sum and adjust the first split upward as needed
    const basisPointsSum = Object.values(splits).reduce((sum, val) => sum += val, 0)
    const gap = 10_000 - basisPointsSum

    // fill any gaps due to rounding
    if (gap > 0) {
      const firstKey = Object.keys(splits)[0]
      splits[firstKey] += gap
    }

    return {
      splits,
      percentage //: percentage / basisMultiplier  // re-adjust for royalty total
    };
}