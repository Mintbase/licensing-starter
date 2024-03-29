import Head from "next/head";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useListed } from "@/hooks/useListed";

export default function Home() {
  const { data, loading, error } = useListed();
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
        <div className="hero">
          <div className="hero-center">
            <h1>Transparent + instant royalties.</h1>
            <h3>Demo the future of creative licensing built on Mintbase.</h3>
            <p><span>THIS IS NOT AN ACTUAL IMAGE LICENSING PRODUCT.<br />IT IS FOR DEMONSTRATION PURPOSES ONLY.</span></p>
          </div>
        </div>
        <Gallery images={data} error={error} loading={loading} />
        <Footer />
      </main>
    </>
  );
}
