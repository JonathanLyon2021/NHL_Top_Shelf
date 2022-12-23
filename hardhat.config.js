require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
const fs = require("fs");
const projectId = process.env.PROJECT_ID;
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
solidity: {
  version: "0.8.4",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}
};
