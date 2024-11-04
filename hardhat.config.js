require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
const fs = require('fs');
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",  // Ganache's default RPC URL
      accounts: [
        '0xf09644a6eec347b4d1ef24b06d1f80809fd314c9118b94dcecf28d28e9a75d87'  // Replace with a private key from Ganache
      ]
    },
    hardhat: {
      chainId: 1337
    },
//    mumbai: {
//      url: `https://polygon-mumbai.g.alchemy.com/v2/nAhiCHKvZkhkp4A7PkkCIBON0-BXW26d`,
//      //accounts: [process.env.privateKey]
//    },
//    matic: {
//      url: "https://polygon-mainnet.g.alchemy.com/v2/nAhiCHKvZkhkp4A7PkkCIBON0-BXW26d",
//      //accounts: [process.env.privateKey]
//    },
//    goerli: {
//      url: process.env.REACT_APP_ALCHEMY_API_URL,
//      accounts: [ process.env.REACT_APP_PRIVATE_KEY ]
//    }
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

