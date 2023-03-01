import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Loader } from "@/components/Loader";
import {
  NO_RAMP_API_KEY,
  NO_RAMP_KYC_ENDPOINT,
  NO_RAMP_PRICE_ENDPOINT,
  NO_RAMP_TRIGGER_ID, useNoRamp, useNoRampEvent } from "@/hooks/useNoRamp";
import { tokenQuery, useToken } from "@/hooks/useToken";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useNearPrice } from "@mintbase-js/react";
import { utils } from "near-api-js";
import { NextPageContext } from "next";
import Head from "next/head";
import { useCallback } from "react";

// create a new client for SSR


type Props = {
  tokenId: string
  priceId: string
  amount: string
}

export default function BuyWithFiatPage({ tokenId }: Props) {
  const { token, loading: tokenLoading } = useToken(tokenId as string);
  const { amount, priceId } = useNoRamp(tokenId);
  const onEvent = useCallback((eventData: any) => {
    console.log('eventData', eventData.type, eventData)
  }, []);

  useNoRampEvent({
    event: 'onPayment',
    handler: onEvent,
  });
  const isLoading = tokenLoading

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
      <main className="detail-view ">
        {isLoading
          ? <Loader />
          : (
              <div className="fiat-form">
                <h5>Purchase License</h5>
                <div className="thumbnail" style={{backgroundImage: `url(${token.media})`}}>

                </div>
                <div className="license-info">
                  <h4>{token?.title}</h4>
                  <h1>{token.photographer}</h1>
                  <h3><span>${amount} USD</span>*</h3>
                  <p>*Not including market and processing fees.</p>
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

export const getServerSideProps = async ({ query }: NextPageContext) => {
  return {
    props: {
      tokenId: query.tokenId,
    }
  }
}