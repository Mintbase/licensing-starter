import { useEffect, useState } from "react"
import { getTxnStatus } from '@mintbase-js/rpc';
import { useWallet } from "@mintbase-js/react";

type TxnResults = {
  loading: boolean
  success: boolean
  error: string
}

export const useTxnResults = (hashes: string[]): TxnResults => {
  const { activeAccountId } = useWallet();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchTxnStatus() {
      try {
        const results = await Promise.all(
          hashes.map(hash => getTxnStatus(hash, activeAccountId as string))
        )

        if (results.filter(result => result !== 'success').length > 0) {
          setError('One or more of the transactions failed!');
          setLoading(false);
          return;
        }

        setSuccess(true);
        setLoading(false);

      } catch (err) {
        console.error(`Error making RCP call ${err}`)
        setError(err as string)
        setLoading(false)
      }
    }

    if (activeAccountId) {
      void fetchTxnStatus();
    }
  }, [hashes, activeAccountId])

  return {
    loading,
    success,
    error
  }

}