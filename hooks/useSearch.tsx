
import { useEffect, useState } from "react";
import { LicenseToken } from "./useToken"
import algoliasearch from 'algoliasearch/lite';


const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_KEY as string,
);
const index = client.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX as string);

type UseSearchHookReturn = {
  results: LicenseToken[]
  loading: boolean
  error: unknown
}

export const useSearch = (term: string): UseSearchHookReturn => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<LicenseToken[]>([]);

  useEffect(() => {
    async function search() {
      try {
        const { hits } = await index.search<LicenseToken>(term, {
          filters: `contractId:${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`
        });
        setResults(hits);
        setLoading(false);
      } catch (e) {
        console.error(`Algolia search error: ${e}`);
        setError(e as any);
      }
    }
    void search()
  }, [term]);

  return {
    results,
    loading,
    error,
  }
}