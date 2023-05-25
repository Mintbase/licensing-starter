import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Loader } from "@/components/Loader";
import { useTransactionSuccess } from "@/hooks/useTransactionSuccess";
import { useTxnResults } from "@/hooks/useTxnResults";
import { NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";

type Props = {
  hashes: string[];
};

// http://localhost:3000/txn?signMeta={%22type%22:%22mint%22,%22args%22:{%22actions%22:[{%22type%22:%22twitter-intent%22,%22args%22:{%22taggedAccounts%22:[%22@mintbase%22,%22@microchipgnu%22],%22text%22:%22[DEV]%20Your%20Twitter%20account%20is%20receiving%20royalties%20from%20an%20NFT.%20Claim%20your%20account.%22,%22url%22:%22http://localhost:3000/claim-royalties%22}}]}}&transactionHashes=Ft29y8jzyTWJrENopGhCTsaUBamK7TE6Ke3gtrsvXrMP

export default function TransactionResult({ hashes }: Props) {
  const { loading, success, error } = useTxnResults(hashes);
  const { args, isReady, type } = useTransactionSuccess();

  console.log(args);

  const HashLinks = () => (
    <ul>
      {hashes.map((hash, i) => (
        <li key={`hash-${i}`}>
          <a href={`https://testnet.nearblocks.io/txns/${hash}`}>{hash}</a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <Head>
        <title>Transaction Result</title>
        <meta
          name="description"
          content="A demonstration of blockchain NFT licensing"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      {loading ? <Loader /> : null}
      {error ? (
        <main className="txn-results">
          <h1>Error</h1>
          <h3>Something did not go right...</h3>
          <p>
            You may want to check the following hashes:
            <HashLinks />
          </p>
        </main>
      ) : null}
      {success ? (
        <main className="txn-results">
          <h1>Great Success!</h1>
          <h3>
            Go <Link href="/">home</Link> or{" "}
            <Link href="/create">create more</Link>
          </h3>
          <p>
            For future reference, here are the transactions that happened on the
            block chain:
          </p>
          <HashLinks />

          {args.actions.map((action: any) => {
            if (action.type === "twitter-intent") {
              return (
                <a
                  key={"teitter"}
                  target="_blank"
                  rel="noreferrer"
                  href={`https://twitter.com/intent/tweet?url=${
                    action.args.url
                  }&text=${
                    action.args.text +
                    "\n" +
                    action.args.taggedAccounts.join(" ")
                  }`}
                >
                  Let royalty recipients know (Twitter)
                </a>
              );
            }
          })}
        </main>
      ) : null}

      <Footer />
    </>
  );
}

export const getServerSideProps = ({ query }: NextPageContext) => {
  return {
    props: {
      hashes: ((query.transactionHashes as string) || "").split(","),
    },
  };
};
