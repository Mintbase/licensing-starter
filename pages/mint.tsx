import { WalletConnectButton } from "@/components/WalletConnectButton";
import Head from "next/head";
import Link from "next/link";
import { RDF, RDFField, useRDF } from "radix-declarative-form";
import { useState } from "react";
import { execute, depositStorage, mint, list } from "@mintbase-js/sdk";
import { useWallet } from "@mintbase-js/react";
import { utils } from "near-api-js";

type FormState = {
  title: string;
  description: string;
  photographer: string;
  media: File;
};

type Reference = { id: string; media_hash: string };

const fields: RDFField<FormState>[] = [
  {
    type: "text",
    name: "title",
    label: "Title of creative license",
    placeholder: "Rights managed",
    options: {
      required: "Give the license a title",
    },
  },
  {
    type: "text",
    name: "photographer",
    label: "Photographer",
    // placeholder: '',
    options: {
      required: "Give the license a title",
    },
  },
  {
    type: "multiline",
    name: "description",
    label: "Describe the work",
    placeholder:
      "The vastness of the universe was channeled to produce this fine art",
  },
  {
    type: "media",
    name: "media",
    label: "Upload image preview (<30mb)",
  },
];

export default function Mint() {
  const contract = process?.env?.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const { selector, activeAccountId } = useWallet();
  const [dataInFlight, setDataInFlight] = useState(false);
  const form = useRDF(fields, async (fd: FormData, state: FormState) => {
    setDataInFlight(true);
    const wallet = await selector.wallet();
    try {
      // set JSON attributes from from state
      fd.set(
        "attributes",
        JSON.stringify([
          {
            trait_type: "website",
            display_type: "website",
            value: "https://nearcon.org/",
          },
          {
            trait_type: "photographer",
            display_type: "string",
            value: state.photographer,
          },
        ])
      );
      const postRequest = await fetch("https://ar.mintbase.xyz/reference", {
        method: "POST",
        headers: { "mb-api-key": "licensing-example" },
        body: fd,
      });

      const reference: Reference = await postRequest.json();
      console.log("created arweave hash, ready 2 mint!", reference);

      const nextTokenIdRequest = await fetch(
        `https://surface-meta-testnet-z3w7d7dnea-ew.a.run.app/${contract}/next_token_id`,
        {
          method: "GET",
          headers: { "mb-api-key": "licensing-example" },
        }
      );

      const nextTokenId = Number(await nextTokenIdRequest.text());
      console.log("got next token id: ", nextTokenId);

      handleMint(reference, activeAccountId as string, wallet, nextTokenId);
      setDataInFlight(false);
    } catch (e) {
      setDataInFlight(false);
      console.error(e);
    }
  });
  return (
    <>
      <Head>
        <title>Create License</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <Link href="/">back home</Link>
        <WalletConnectButton />
        <h1>Mint a license</h1>
        <RDF<FormState>
          form={form}
          isInFlight={dataInFlight}
          submitButtonLabel="Create License"
          submitButtonLabelInFlight="Creating..."
        />
      </main>
    </>
  );
}

async function handleMint(
  reference: Reference,
  activeAccountId: string,
  wallet: any,
  nextTokenId: number
) {
  if (reference) {
    const mintCall = mint({
      metadata: { reference: reference.id, media: reference.media_hash },
      ownerId: activeAccountId,
      options: {
        royaltyPercentage: 0.1,
        splits: {
          "example1.testnet": 0.4,
          "example2.testnet": 0.3,
          "example3.testnet": 0.3,
        },
      },
    });
    const depositStorageCall = depositStorage({});
    const listCall = list({
      price: "5",
      tokenId: (nextTokenId + 1).toString(),
    });

    await execute({ wallet }, mintCall, depositStorageCall, listCall);
  }
}
