import { Detail } from "@/components/Detail";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Head from "next/head";

export default function DetailPage() {
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
      <main className={"main"}>
        <Detail />
      </main>
      <Footer />
    </>
  );
}
