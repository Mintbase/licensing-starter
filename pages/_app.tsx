import type { AppProps } from "next/app";
import { WalletContextProvider } from "@mintbase-js/react";
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

mbjs.config({
  network: process.env.NEXT_PUBLIC_NEAR_NETWORK || "testnet",
  callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL,
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
});

const client = new ApolloClient({
  uri: "https://graph.mintbase.xyz/testnet",
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
      <ApolloProvider client={client}>
        <WalletContextProvider>
          <Component {...pageProps} />
        </WalletContextProvider>
      </ApolloProvider>
  );
}
