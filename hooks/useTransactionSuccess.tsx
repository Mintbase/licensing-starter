import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export const getLocalStorage = () => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch (e) {
    console.log("window.localStorage has been disabled on this client");
    return null;
  }
};

const useTransactionSuccess = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const [isMetaReady, setIsMetaReady] = useState(false);

  const metadata = useMemo(() => {
    if (!isReady) return;

    const res = JSON.parse(query.signMeta as string);

    if (res?.type === "deploy-store") {
      getLocalStorage()?.setItem("selected-store", res?.args?.contractName);
    }

    return res;
  }, [isReady]);

  useEffect(() => {
    if (!metadata?.args || !metadata?.type) return;
    setIsMetaReady(true);
  }, [metadata]);

  return {
    type: metadata?.type,
    args: { ...metadata?.args, transactionHashes: query?.transactionHashes },
    isReady: isMetaReady,
  };
};

export { useTransactionSuccess };
