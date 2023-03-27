import { useWallet } from "@mintbase-js/react";
import { execute, burn, delist } from '@mintbase-js/sdk';

export const useNearActions = () => {
  const { selector } = useWallet();
  const burnToken = async (tokenId: string) => {
    const wallet = await selector.wallet();
    const burnCall = burn({
      contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      tokenIds: [tokenId]
    })
    return await execute({ wallet, callbackUrl: process?.env?.NEXT_PUBLIC_CALLBACK_URL }, burnCall);
  }

  const delistToken = async (tokenId: string) => {
    const wallet = await selector.wallet();
    const burnCall = delist({
      contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
      tokenIds: [tokenId]
    })
    return await execute({ wallet, callbackUrl: process?.env?.NEXT_PUBLIC_CALLBACK_URL }, burnCall);
  }



  return {
    burnToken,
    delistToken
  };
};
