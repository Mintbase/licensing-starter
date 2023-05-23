import Head from "next/head";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
import pubnub from "utils/pubnub";
import { v4 as uuid } from "uuid";

const REQUEST_SEED_CHANNEL = "request_seed";

export default function ClaimRoyalties() {
  const [sessionId] = useState(uuid());
  useEffect(() => {
    pubnub.addListener({
      message: async (event) => {
        if (event.channel === `${REQUEST_SEED_CHANNEL}`) {
          const { accountId, uid, platformId } = event.message;

          const request = await fetch("/api/claim-royalties", {
            method: "POST",
            body: JSON.stringify({ accountId, uid, platformId }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const result = await request.json();
        }
      },
    });

    pubnub.subscribe({ channels: [`${REQUEST_SEED_CHANNEL}`] });

    return () => {
      pubnub.unsubscribeAll();
    };
  }, []);

  //   useEffect(() => {
  //     openPopup();
  //   }, [sessionId]);

  const openPopup = () => {
    const iframeUrlSessionId =
      "https://sdk-iframe.herokuapp.com/royalties" + "?uuid=" + sessionId;

    window.open(
      iframeUrlSessionId,
      "popup",
      "width=900,height=640,toolbar=no,menubar=no"
    );
  };

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

      <main className={"main"}>
        <div className="hero">
          <div className="hero-center">
            <h1>Claim Royalties</h1>
            <h3>Description</h3>
          </div>
        </div>
        <div className="about-body">
          <p>Paragraph about about royalties.</p>
          <p>Paragraph about the NFT?</p>
          <button onClick={openPopup}>Claim Account</button>
        </div>
        <Footer />
      </main>
    </>
  );
}
