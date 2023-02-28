import { Detail } from "@/components/Detail";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Loader } from "@/components/Loader";
import { useNoRamp, useNoRampEvent } from "@/hooks/useNoRamp";
import { useToken } from "@/hooks/useToken";
import { useNearPrice } from "@mintbase-js/react";
import { NextPageContext } from "next";
import Head from "next/head";
import { useCallback } from "react";

type Props = {
  tokenId: string
}

export default function BuyWithFiatPage({ tokenId }: Props) {

  const { token, loading: tokenLoading } = useToken(tokenId as string);
  const { nearPrice } = useNearPrice();
  const priceUSD = (Number(token.nearPrice) * Number(nearPrice)).toFixed(2);
  const { error, loading: noRampLoading, priceId } = useNoRamp(
    tokenId as string,
    token.minter,
    'benipsen.testnet',
    priceUSD
  );

  const onEvent = useCallback((eventData: any) => {
    console.log('eventData', eventData.type, eventData)
  }, []);

  useNoRampEvent({
    event: 'onPayment',
    handler: onEvent,
  });
  const isLoading = tokenLoading || noRampLoading

  return (
    <>
      <Head>
        <title>Creative Licensing Platform Starter</title>
        <meta
          name="description"
          content="A creative licensing platform that works on NEAR protocol, powered by Mintbase."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="detail-view fiat-form">
        {isLoading
          ? <Loader />
          : (
              <div>
                <h5>Purchase License</h5>
                <div className="thumbnail" style={{backgroundImage: `url(${token.media})`}}>

                </div>
                <div className="license-info">
                  <h4>{token?.title}</h4>
                  <h1>{token.photographer}</h1>
                  <h3><span>${priceUSD} USD</span></h3>
                </div>
                <iframe
                  src={`https://testnet.on-noramp.com/embed/payments/app_2TtUkzu8ysYF3qlc6HZSoT?price_id=${priceId}&theme=light`}
                  frameBorder="0"
                  height="220"
                  width="100%"
                />
              </div>
            )

        }
      </main>
      <Footer />
    </>
  );
}

// TODO: server side fetch is probably better
//      possible necessary for noramp api keys
export const getServerSideProps = ({ query }: NextPageContext) => {
  return {
    props: {
      tokenId: query.tokenId
    }
  }
}