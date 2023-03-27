import Head from "next/head";
import { Header } from "@/components/Header";
import { useWallet } from "@mintbase-js/react";
import { CreateHome } from "@/components/CreateHome";
import { PromptLogin } from "@/components/PromptLogin";
import { Footer } from "@/components/Footer";
import { CreateMenu } from "@/components/CreateMenu";
import { CreateManage } from "@/components/CreateManage";

export default function Settings() {
  const { activeAccountId } = useWallet();

  return (
    <>
      <Head>
        <title>Settings - Licensing Demo</title>
        <meta name="description" content="A demonstration of blockchain NFT licensing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="container">
        {activeAccountId
          ? <CreateMenu />
          : null
        }
        <main className="main">
          <h1>User Settings Placeholder</h1>
        </main>
      </div>
      <Footer />
    </>
  );
}
