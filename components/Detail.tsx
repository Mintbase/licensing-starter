/* eslint-disable @next/next/no-img-element */
import { useToken } from "@/hooks/useToken";
import { useWallet } from "@mintbase-js/react";
import { buy, execute } from "@mintbase-js/sdk";
import { useRouter } from "next/router";
import { Loader } from "./Loader";


export const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { token, loading } = useToken(id as string);
  const { selector } = useWallet();
  const handleBuy = async () => {
    const wallet = await selector.wallet();
    const buyCall = buy({
      price: token.yoctoPrice,
      tokenId: id as string,
      affiliateAccount: process.env.NEXT_PUBLIC_AFFILIATE || 'mintbus.testnet'
    });
    execute({ wallet }, buyCall);
  };

  const loadImg = (e: any) => {
    e.target.style.opacity = 1;
  }

  if (loading) return <Loader />;

  return (
    <main className={"detail-view"}>
      <div className="col left">
        <img src={token?.media} alt={token.description} onLoad={loadImg} />
        <p className="detail">{token.description}</p>
      </div>
      <div className="col right">
        <h4>{token?.title}</h4>
        <h1>{token.photographer}</h1>
        <h3>Purchase price {token.nearPrice}N</h3>

        <div className="buttons">
          <button onClick={() => handleBuy()} className="buy-button icon-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
            <span>Acquire</span>
          </button>
          <button onClick={() => window.open(token.url)} className="dl-button icon-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
            </svg>
            <span>Download</span>
          </button>
        </div>
        <p className="terms-link"><a href={token.license} target="_blank" rel="noreferrer">View license terms</a></p>
        <h4>Royalty Holders</h4>
        {token.royalties && token.royalties.length > 0
          ? <table className="royalties-table">
              {token.royalties.map(({ account, percent }) =>
                  (<tr key={`rev-${account}`}>
                    <td className="account-col">{account}</td>
                    <td className="percent-col">{percent}%</td>
                  </tr>
                )
              )}
          </table>
          : null
        }
      </div>
    </main>
  );
};
