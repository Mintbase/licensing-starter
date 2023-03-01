import { useWallet } from "@mintbase-js/react";
import { useCallback, useEffect, useState } from "react";

type UseNoRampReturn = {
  priceId: string | null
  amount: string | null
  loading: boolean
  error: unknown
}

export const NO_RAMP_TRIGGER_ID = 'tri_4qkXyv0yI1Afi2SueSVYf1';
export const NO_RAMP_API_KEY = '6522860240193e0e2ba7cf02a1ce340ed7c75b107d2e06f779fe02a00e89423d';
export const NO_RAMP_KYC_ENDPOINT = 'https://api-testnet.noramp.io/apps/app_2TtUkzu8ysYF3qlc6HZSoT/kycs';
export const NO_RAMP_PRICE_ENDPOINT = 'https://api-testnet.noramp.io/prices/app_2TtUkzu8ysYF3qlc6HZSoT';

export const useNoRamp = (tokenId: string) => {
  const { activeAccountId } = useWallet();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [priceId, setPriceId] = useState(null);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    async function fetchNoRampPrice() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_NORAMP_ENDPOINT as string}?tokenId=${tokenId}&to=${activeAccountId}`);
        const { priceId, amount } = await res.json();
        setLoading(false);
        setPriceId(priceId);
        setAmount(amount);
      } catch (e) {
        console.error(e);
        setError(e as any);
      }
    };

    if (activeAccountId) {
      void fetchNoRampPrice();
    }

  }, [activeAccountId, tokenId])

  return {
    priceId,
    amount,
    loading,
    error
  }
}

export const useNoRampKYC = () => {
  const { activeAccountId } = useWallet();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [editToken, setEditToken] = useState(null);
  const fetchNoRampData = useCallback(async (endpoint: string, body: object) => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${NO_RAMP_API_KEY}`,
        },
        body: JSON.stringify(body)
      });

      return await response.json();
    } catch (e) {
      console.error(`Error communicating with noramp ${e}`);
      setError(error);
    }
  }, [error])

  useEffect(() => {
    async function makeNoRampRequests() {
      // get kyc data
      const { data: kyc } = await fetchNoRampData(NO_RAMP_KYC_ENDPOINT, {
        "identifier": activeAccountId
      })
      setEditToken(kyc.edit_token);
    };

    if (activeAccountId) {
      void makeNoRampRequests();
    }

  }, [activeAccountId, fetchNoRampData])

  return {
    loading,
    error,
    editToken
  }
}

export const useNoRampEvent = ({event, handler}: { event: string, handler: (detail: string) => any }) => {
  useEffect(() => {
    const eventName = `noramp:${event}`;

    const onHandler = (e: any) => {
      if (eventName !== e.data.event) return;

      handler(e.data.detail);
    };

    window.addEventListener('message', onHandler, false);

    return () => {
      window.removeEventListener('message', onHandler, false);
    };
  }, [event, handler]);
};
