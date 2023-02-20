import { gql, useQuery } from "@apollo/client";

export const useToken = (token_id: string) => {
  const { data, loading } = useQuery<any>(query, {
    variables: {
      contractId: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      token_id: token_id,
    },
    context: {
      headers: { "mb-api-key": "anon" },
    },
  });
  //TODO add error handling
  return { data: data?.mb_views_active_listings[0], loading: loading };
};

const query = gql`
  query listedByContract($contractId: String!, $token_id: String!) {
    mb_views_active_listings(
      where: {
        nft_contract_id: { _eq: $contractId }
        token_id: { _eq: $token_id }
      }
    ) {
      media
      price
      reference
      title
      token_id
      metadata_id
    }
  }
`;
