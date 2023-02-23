/* eslint-disable @next/next/no-img-element */
import { useToken } from "@/hooks/useToken";
import { useWallet } from "@mintbase-js/react";
import { buy, execute } from "@mintbase-js/sdk";
import { useRouter } from "next/router";

export const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useToken(id as string);
  const { selector } = useWallet();

  const handleBuy = async () => {
    const wallet = await selector.wallet();
    const buyCall = buy({
      price: data?.price,
      tokenId: id as string,
    });
    execute({ wallet }, buyCall);
  };

  console.log(data);

  if (loading) return <h1>Loading...</h1>;

  return (
    <main className={"detail-view"}>
      <h1>{data?.title}</h1>
      <img src={data?.media} alt="" />
      <div>
        <button onClick={() => handleBuy()}> Buy </button>
      </div>
    </main>
  );
};
