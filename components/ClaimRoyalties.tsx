import { Footer } from "@/components/Footer";
import { PUBNUB_REQUEST_CHANNEL_BASE } from "@/integrations/social-accounts/constants";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import pubnub from "utils/pubnub";
import { v4 as uuid } from "uuid";

export default function ClaimRoyalties() {
  const sessionId = useMemo(() => {
    return uuid();
  }, []);

  useEffect(() => {
    pubnub.addListener({
      message: async (event) => {
        if (event.channel === `${PUBNUB_REQUEST_CHANNEL_BASE}${sessionId}`) {
          const { accountId, uid, platformId } = event.message;

          fetch("/api/claim-royalties", {
            method: "POST",
            body: JSON.stringify({ accountId, uid, platformId, sessionId }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
      },
    });

    pubnub.subscribe({
      channels: [`${PUBNUB_REQUEST_CHANNEL_BASE}${sessionId}`],
    });

    return () => {
      pubnub.unsubscribeAll();
    };
  }, []);

  const openPopup = () => {
    const iframeUrlSessionId = `https://sdk-iframe.herokuapp.com/royalties?uuid=${sessionId}`;

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
          <Link
            href={`https://sdk-iframe.herokuapp.com/royalties?uuid=${sessionId}`}
            target="_blank"
            rel="noreferrer"
          >
            <button>Claim Account</button>
          </Link>
        </div>
        <Footer />
      </main>
    </>
  );
}
