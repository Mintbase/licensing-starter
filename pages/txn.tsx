import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { NextPageContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'

type Props = {
  hashes: string[]
}

export default function TransactionResult({ hashes }: Props) {
  console.log('got hashes?', hashes)
  return (
    <>
      <Head>
        <title>Transaction Result</title>
        <meta name="description" content="A demonstration of blockchain NFT licensing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="success">
        <h1>Great Success!</h1>
        <h3>Go <Link href="/">back home</Link> or <Link href="/mint">mint again</Link></h3>
        <p>This is a transaction success redirect page. Eventually, it will do the following:</p>
        <ul>
          <li>Displays a loader</li>
          <li>Uses RPC to validate the transaction went as planned.</li>
          <li>Polls the indexer depending on the transaction results to ensure expected data is present</li>
          <li>Displays the result of the checks</li>
        </ul>
      </main>
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
