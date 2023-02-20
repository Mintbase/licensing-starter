import Head from "next/head";
import Link from "next/link";
import { Gallery } from "@/components/Gallery";

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
      <main className={"main"}>
        <h1>
          This will be the homepage. For now, go{" "}
          <Link href={`/mint`}>mint</Link> a license!
        </h1>
        <Gallery />
      </main>
    </>
  );
}
