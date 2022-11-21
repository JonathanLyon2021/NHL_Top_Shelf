require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
const fs = require("fs");
const projectId = "460a2af81be44b31aed0e928f26cbc53"
const privateKey = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
networks: {
  hardhat: {
    chainId: 1337 // 1337 is for Geth //
  },
  mumbai: {
    url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
    accounts: [privateKey] //priv.key inside git.ignore
  },
 mainnet: {
    url: `https://polygon-mainnet.infura.io/v3/${projectId}`,
    accounts: [privateKey]  //priv.key inside git.ignore
  },
 },
solidity: "0.8.4",
};
