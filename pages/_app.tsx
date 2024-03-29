/* eslint-disable @next/next/no-page-custom-font */
import type { AppProps } from "next/app";
import { WalletContextProvider } from "@mintbase-js/react";
import { Poppins } from "@next/font/google";
import "@near-wallet-selector/modal-ui/styles.css";
import "radix-declarative-form/rdf.css";
import "@/styles/globals.css";
import { mbjs } from "@mintbase-js/sdk";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const poppins = Poppins({
  weight: ['100', '400', '700'],
  subsets: ["latin"],
});


mbjs.config({
  network: process.env.NEXT_PUBLIC_NEAR_NETWORK || "testnet",
  callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL,
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
});

export const client = new ApolloClient({
  uri: "https://graph.mintbase.xyz/testnet",
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
      <style jsx global>{`
        :root {
          --poppins: ${poppins.style.fontFamily};
        }
      `}</style>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;400;700&display=swap" />
      <ApolloProvider client={client}>
        <WalletContextProvider>
          <Component {...pageProps} />
        </WalletContextProvider>
      </ApolloProvider>
    </>
  );
}
