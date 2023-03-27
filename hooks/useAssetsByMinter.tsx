import { gql, useQuery } from "@apollo/client";

type ReferenceBlob = {
  photographer: string
}

type QueryResult = {
  reference_blob: ReferenceBlob
  token_id: string
}

export const useAssetsByMinter = (minter: string | null) => {
  const { data, loading, error } = useQuery<any>(query, {
    variables: {
      contractId: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      minter
    },
    skip: !minter,
    context: {
      headers: { "mb-api-key": "anon" },
    },
  });

  if (!minter) {
    return { loading: true }
  }

  return {
    data: data?.mb_views_nft_tokens.map((listing: Partial<QueryResult>) => ({
      ...listing,
      photographer: listing.reference_blob?.photographer,
      tokenId: listing.token_id
    })),
    loading,
    error
  };
};

const query = gql`
  query assetsByContractMinter($contractId: String!, $minter: String!) {
    mb_views_nft_tokens(
      where: {
        nft_contract_id: { _eq: $contractId }
        minter: { _eq: $minter }
        owner: { _eq: $minter }
        burned_timestamp: { _is_null: true }
      }
      order_by: { minted_timestamp: desc }
      limit: 20
    ) {
      media
      reference
      title
      token_id
      metadata_id
      reference_blob
      listings(limit: 1) {
        price
      }
    }
  }
`;
