## Licensing Starter

A starting point for creating an image licensing platform that works on Mintbase NFT infrastructure and open soruce components.

## What's next?

### Fiat Payments

License holders will be able to pay aquisition fees in USD using Mintbase platform powered by Stripe. **Mintbase will provide this feature via its platform**

### Royalty Holders

If collaborators and other royalty holders are not registered with NEAR yet, creators and publishers will be able to add them using an email or social media contact.

Payments are automatically streamed to a custodial address where they will remain for future claims.

**This is a collaborative plat**

### Multi Contract Platfom

Publishers will be able to deploy their own smart contracts and invite creators to license through the shared platform.

**This and future features may developed by a small team working with Mintbase support**


<br><br>
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

