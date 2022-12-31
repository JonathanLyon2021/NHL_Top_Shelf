# NHL_Top_Shelf
This is a Dapp that I based off of NBA's Top Shot blockchain-based virtual trading card platform, except this is just NHL(National Hockey League) based marketplace.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
The libraries used in this app are:
`npm install`
*ethers*  <br>
*hardhat*  <br>
*ethereum-waffle*  <br>
*chai*  <br>
*web3modal*  <br>
*axios*  <br>
*ipfs-http-client*  <br>
*@nomiclabs/hardhat-waffle*  <br>
*@nomiclabs/hardhat-ethers*  <br>
*openzeppelin/contracts*  <br>

** Dev Dependency installs
`npm install` <br>
*tailwindcss@latest  <br>
*postcss@latest   <br>
*autoprefixer@latest  <br>

Then after you install them run this command which creates two files that we'll need: A Tailwind CSS config file and a postcss.config.js
`npx tailwindcss init -p`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000] with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


### Allowlists on Infura
These types of contract addreses are allowed to interact with the smart contract in the program. Allowlists protect your project from undesireable activity, they restrict access to specific addresses, HTTP headers ``User-Agent`` and ``Origin``, and API request methods. <br>
Any requests which query addresses that are not in the allowlist are rejected. <br>
The following RPC methods take an Ethereum address parameter and are compatible with this type of allowlisting:
``eth_call``  <br>
``eth_estimateGas``  <br>
``eth_getLogs``  <br>
``eth_getBalance``  <br>
``eth_getCode``  <br>
``eth_getStorageAt``  <br>
``eth_getTransactionCount``  <br>
