import Head from "next/head";
import { Header } from "@/components/Header";
import { useWallet } from "@mintbase-js/react";
import { PromptLogin } from "@/components/PromptLogin";
import { Footer } from "@/components/Footer";
import { useNoRampKYC } from "@/hooks/useNoRamp";

export default function Mint() {
  const { activeAccountId } = useWallet();
  const { editToken } = useNoRampKYC();
  return (
    <>
      <Head>
        <title>Receive Fiat Payments</title>
        <meta name="description" content="A demonstration of blockchain NFT licensing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="main">
        {activeAccountId && editToken
          ? <iframe
              src={`https://testnet.on-noramp.com/embed/kyc/${editToken}?theme=light`}
              frameBorder="0"
              height="460"
              width="100%"
            />
          : <PromptLogin />
        }
      </main>
      <Footer />
    </>
  );
}
