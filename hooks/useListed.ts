import { gql, useQuery } from "@apollo/client";

type ReferenceBlob = {
  photographer: string
}

type QueryResult = {
  reference_blob: ReferenceBlob
  token_id: string
}

export const useListed = () => {
  const { data, loading, error } = useQuery<any>(query, {
    variables: { contractId: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS },
    context: {
      headers: { "mb-api-key": "anon" },
    },
  });

  return {
    data: data?.mb_views_active_listings.map((listing: Partial<QueryResult>) => ({
      ...listing,
      photographer: listing.reference_blob?.photographer,
      tokenId: listing.token_id
    })),
    loading,
    error
  };
};

const query = gql`
  query listedByContract($contractId: String!) {
    mb_views_active_listings(where: { nft_contract_id: { _eq: $contractId } }) {
      media
      price
      reference
      title
      token_id
      metadata_id
      reference_blob
    }
  }
`;
