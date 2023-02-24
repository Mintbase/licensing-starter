import { gql, useQuery } from "@apollo/client";
import { utils } from 'near-api-js'

export type LicenseToken = {
  nearPrice: string
  yoctoPrice: string
  media: string
  title: string
  photographer: string
  description: string
  license: string
  url: string
  royalties: {
    account: string
    percent: string
  }[]
}

type TokenHookReturn = {
  loading: boolean
  error: unknown
  token: LicenseToken
}

export const useToken = (token_id: string): TokenHookReturn => {
  const { data, loading, error } = useQuery<any>(query, {
    variables: {
      contractId: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      token_id: token_id,
    },
    context: {
      headers: { "mb-api-key": "anon" },
    },
  });

  const token = data?.mb_views_nft_tokens[0]

  if (!token) {
    return {
      token: {} as LicenseToken,
      loading,
      error
    }
  }

  console.log('fml', token);

  const ref = data?.reference_blob;

  const yoctoPrice = token?.listings
    ? token.listings[0].price
      .toLocaleString()
      .replaceAll(',','')
      .replaceAll('.','')
    : 0

  const nearPrice = utils.format.formatNearAmount(yoctoPrice);

  // parse royalties from mint memo
  const memo = JSON.parse(token.mint_memo);
  const royaltyTotalPercentage = Number(memo.royalty.percentage.numerator);
  const memoRoyalties = memo.royalty.split_between || {}

  const sumSplits = Object
    .entries(memoRoyalties as Record<string, {numerator: number }>)
    .reduce((sum, [account, basis]) => sum += basis.numerator, 0)

  const royalties = Object
    .entries(memoRoyalties as Record<string, {numerator: number }>)
    .map(([account, basis]) => ({
      account,
      percent: ((basis.numerator / sumSplits * royaltyTotalPercentage) / 100).toPrecision(2)
  }))

  return {
    token: {
      ...token,
      ...ref,
      nearPrice,
      yoctoPrice,
      royalties,
    } as LicenseToken,
    loading,
    error
  };
};

const query = gql`
  query listedByContract($contractId: String!, $token_id: String!) {
    mb_views_nft_tokens(
      where: {
        nft_contract_id: { _eq: $contractId }
        token_id: { _eq: $token_id }
      }
    ) {
      media
      reference
      title
      mint_memo
      token_id
      metadata_id
      reference_blob
      listings {
        price
      }
    }
  }
`;
