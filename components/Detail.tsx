/* eslint-disable @next/next/no-img-element */
import { useToken } from "@/hooks/useToken";
import { useNearPrice, useWallet } from "@mintbase-js/react";
import { buy, execute } from "@mintbase-js/sdk";
import { useRouter } from "next/router";
import { Loader } from "./Loader";
import Link from "next/link";

export const Detail = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const { token, loading } = useToken(tokenId as string);
  const { selector, activeAccountId } = useWallet();
  const { nearPrice } = useNearPrice();
  const priceUSD = (Number(token.nearPriceAsNumber) * Number(nearPrice)).toFixed(2);

  const handleBuy = async () => {
    const wallet = await selector.wallet();
    const buyCall = buy({
      price: token.yoctoPrice,
      tokenId: tokenId as string,
      affiliateAccount: process.env.NEXT_PUBLIC_AFFILIATE || 'mintbus.testnet'
    });
    execute({ wallet }, buyCall);
  };

  const handleFiatBuy = () => {
    router.push(`/fiat/${tokenId}`)
  }

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
        <Link className="back-home" href="/">Go Back</Link>
        <h4>{token?.title}</h4>
        <h1>{token.photographer}</h1>

        {token.isAvailable
          ? <h3>Offered for {token.nearPrice}N <span>~${priceUSD} USD</span></h3>
          : <h3>No licenses available.</h3>
        }
        <div className="buttons">
          {token.isAvailable
            ?
              <button onClick={() => handleBuy()} className="buy-button icon-button" disabled={!activeAccountId}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
                <span>Acquire On NEAR</span>
              </button>
            : null
          }
          {token.isAvailable
            ?
              <button onClick={() => handleFiatBuy()} className="buy-button icon-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
                <span>Acquire With Card</span>
              </button>
            : null
          }
          <button onClick={() => window.open(token.url)} className="dl-button icon-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
            </svg>
            <span>Download</span>
          </button>
        </div>
        <p className="terms-link">
          <a href={token.license} target="_blank" rel="noreferrer">
            License terms &nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
            </svg>
          </a>
          <a href={`https://arweave.net/${token.reference}`} target="_blank" rel="noreferrer">
            Reference materials &nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
            </svg>
          </a>
        </p>

        {token.royalties && token.royalties.length > 0
          ? <div>
              <h4>Royalty Holders</h4>
              {token.royalties.map(({ account, percent }) =>
                (
                  <div key={`rev-${account}`} className="royalties-row">
                    <div className="account-col">{account}</div>
                    <div className="percent-col">{percent}%</div>
                  </div>
                )
              )}
            </div>
          : null
          }
      </div>
    </main>
  );
};
