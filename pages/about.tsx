import Head from "next/head";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function About() {
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
            <h1>About</h1>
            <h3>Web3 Stock or 3ST for short, is a creative licensing product demonstration.</h3>
            </div>
        </div>
        <div className="about-body">
        <p><b>This demonstration is not intended for commercial purposes.</b> We&apos;re not selling any products or services, and we&apos;re not looking to profit from this demonstration in any way. Instead, our goal is simply to showcase the potential of blockchain technology for managing digital assets and enabling transparent royalty payments for creators.</p>

        <p>This demonstration showcases how blockchain can be used to manage and track digital assets in a secure and transparent way, while also enabling transparent royalty payments.</p>

        <p>Creators face challenges when it comes to licensing their work, including difficulties in tracking the use and payment of their copyrighted material. Traditional licensing processes can be slow, cumbersome, and lack transparency, making it difficult to ensure that photographers receive appropriate royalties for their work.</p>

        <p>The transparency provided by the blockchain means that every transaction can be tracked in real-time, providing creators with full visibility into the use and payment of their copyrighted material. This includes the ability to track how their images are being used, who is using them, and how much they are being paid for each use.</p>
        </div>
        <Footer />
      </main>
    </>
  );
}
