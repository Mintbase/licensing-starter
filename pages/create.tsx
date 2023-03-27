import Head from "next/head";
import { Header } from "@/components/Header";
import { useWallet } from "@mintbase-js/react";
import { CreateHome } from "@/components/CreateHome";
import { PromptLogin } from "@/components/PromptLogin";
import { Footer } from "@/components/Footer";
import { CreateMenu } from "@/components/CreateMenu";

export default function Create() {
  const { activeAccountId } = useWallet();

  return (
    <>
      <Head>
        <title>Create - Licensing Demo</title>
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
          {activeAccountId
            ? <CreateHome />
            : <PromptLogin />
          }
        </main>
      </div>
      <Footer />
    </>
  );
}
