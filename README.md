## Licensing Starter

A SLiC Grant Project Head Start

A starting point for creating an image licensing platform that runs on Mintbase NFT infrastructure and open source components.

# What's next: Mintbase Features

### Fiat Payments
**Mintbase will provide this feature via its platform/APIs.**

License holders will be able to pay aquisition fees in USD using Mintbase platform powered by Stripe.

### Royalty Holders

**This is a collaborative platform level feature to be completed by Mintbase and WallID.**

If collaborators or other royalty holders are not using a NEAR wallet yet, creators and publishers will be able to add them using an email or social media contact.

Payments are automatically streamed to a custodial address where they will remain for future claims.

### Core/Ongoing Improvements
**Mintbase will provide this feature via its platform/APIs.**

Transaction result captures are currently implemented in this demo. They will be abstracted away into the platform by the Mintbase team in the Near future.


# What's next: SLiC Features
## Critical Remaining Views

**This and the following features may developed by a small team working with Mintbase support.**

Views such as "my assets", "total earnings dashboards" and other product owner level determinations will bring the starter into MVP state of completion.

Best estimation based on current state, is that this would take between 4-8 weeks for two or three engineers full time, but would obviously be determined by the specifications created for MVP.

### Onboarding

Photographers will be invited to license and seed the platform on the first publisher contract.

### Multi-Contract Platform

Publishers will be able to deploy their own smart contracts and invite creators to license through the shared platform.


<br>

# Developer Docs

### Questions or comments? Reach out on [Mintbase Telegram](https://t.me/mintdev)

This is a standard NextJS v12 application which uses [mintbase-js](https://docs.mintbase.xyz/dev/mintbase-sdk-ref) [Mintbase Arweave APIs](https://docs.mintbase.xyz/dev/metadata) for metadata, and the [Mintbase Graph](https://docs.mintbase.xyz/dev/mintbase-graph) to display assets as related to the connected user.


### .env

```
NEAR_NETWORK=testnet
NEXT_PUBLIC_CALLBACK_URL=http://localhost:3000/txn
NEXT_PUBLIC_CONTRACT_ADDRESS=creativelicense4.testnet
NEXT_PUBLIC_ARWEAVE_SERVICE=https://ar.mintbase.xyz/reference
NEXT_PUBLIC_AFFILIATE=mintbus.testnet
```

### Dev Server

```
npm i
npm run dev
```

