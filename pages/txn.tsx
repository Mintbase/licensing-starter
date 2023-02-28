import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Loader } from '@/components/Loader'
import { useTxnResults } from '@/hooks/useTxnResults'
import { NextPageContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'

type Props = {
  hashes: string[]
}

export default function TransactionResult({ hashes }: Props) {
  const { loading, success, error } = useTxnResults(hashes);


  const HashLinks = () => (
    <ul>{hashes.map((hash, i) => (
      <li key={`hash-${i}`}><a href={`https://testnet.nearblocks.io/txns/${hash}`}>{hash}</a></li>
    ))}</ul>
  )

  return (
    <>
      <Head>
        <title>Transaction Result</title>
        <meta name="description" content="A demonstration of blockchain NFT licensing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      {loading ? <Loader /> : null}
      {error ?
        <main className="txn-results">
          <h1>Error</h1>
          <h3>
            Something did not go right...
          </h3>
          <p>
            You may want to check any of the following hashes:
            <HashLinks />
          </p>
        </main>
        : null}
      {success ?
        <main className="txn-results">
          <h1>Great Success!</h1>
          <h3>Go <Link href="/">home</Link> or <Link href="/mint">create more</Link></h3>
          <p>For future reference, here are the transactions that happened on the block chain</p>
          <HashLinks />
        </main>
        : null
      }

      <Footer />
    </>
  )
}

export const getServerSideProps = ({ query }: NextPageContext) => {
  return {
    props: {
      hashes: (query.transactionHashes as string || '').split(',')
    }
  }
}
