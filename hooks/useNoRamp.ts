import { useNearPrice, useWallet } from "@mintbase-js/react";
import { useCallback, useEffect, useState } from "react";


type UseNoRampReturn = {
  priceId: string | null
  loading: boolean
  error: unknown
}

// TODO: move to env, possibly SSR only?
const NO_RAMP_TRIGGER_ID = 'tri_4qkXyv0yI1Afi2SueSVYf1';
const NO_RAMP_API_KEY = '6522860240193e0e2ba7cf02a1ce340ed7c75b107d2e06f779fe02a00e89423d';
const NO_RAMP_KYC_ENDPOINT = 'https://api-testnet.noramp.io/apps/app_2TtUkzu8ysYF3qlc6HZSoT/kycs';
const NO_RAMP_PRICE_ENDPOINT = 'https://api-testnet.noramp.io/prices/app_2TtUkzu8ysYF3qlc6HZSoT';

export const useNoRamp = (tokenId: string, sellerId: string, receiverId: string, amount: string): UseNoRampReturn => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [priceId, setPriceId] = useState(null);
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
        "identifier": sellerId
      })
      // get pricing data
      const { data: pricing } = await fetchNoRampData(NO_RAMP_PRICE_ENDPOINT, {
        "currency": "usd",
        "trigger_id": NO_RAMP_TRIGGER_ID,
        trigger_data: {
          params_data: {
            token_id: tokenId,
            receiver_id: receiverId,
            approval_id: 123, // FIXME: we may have to fetch this via RPC call unless we change contract
          },
        },
        "kyc_id": kyc.id,
        "amount": Number(amount)
      })
      setLoading(false)
      setPriceId(pricing.id);
    }

    if (sellerId && tokenId && Number(amount) > 0) {
      void makeNoRampRequests();
    }
  }, [amount, fetchNoRampData, tokenId, receiverId, sellerId])

  return {
    loading,
    error,
    priceId
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
