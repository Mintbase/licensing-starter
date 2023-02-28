import Head from "next/head";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NextPageContext } from "next";
import { useSearch } from "@/hooks/useSearch";

type Props = {
  term: string
}

export default function Search({ term }: Props) {
  const { results, loading, error } = useSearch(term);

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
        <div className="search-results">
          <div className="search-results-center">
            <h1>Search results for <span>{term}</span></h1>
          </div>
        </div>
        {results && results.length > 0
          ? <Gallery images={results} error={error} loading={loading} />
          : <div className="gallery no-results">No results were found for that search.</div>
        }
        <Footer />
      </main>
    </>
  );
}

export const getServerSideProps = ({ query }: NextPageContext) => {
  return {
    props: {
      term: query.term
    }
  }
}
