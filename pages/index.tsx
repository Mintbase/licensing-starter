import Head from "next/head";
import Link from "next/link";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Home() {
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
            <h1>The future of creative licensing.</h1>
            <h3>This is a demonstration of web3 based image licensing</h3>
            <p><span>THIS IS NOT AN ACTUAL IMAGE LICENSING PRODUCT.<br />IT IS FOR DEMO PURPOSES ONLY.</span></p>
          </div>
        </div>
        <Gallery />
        <Footer />
      </main>
    </>
  );
}
