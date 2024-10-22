require('@nomicfoundation/hardhat-toolbox');

module.exports = {
  solidity: "0.8.20",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",  // Ganache's default RPC URL
      accounts: [
        '0x58007cc5e2464940846d1bfcfa7bd809730296aff88f58c2419e383ab3c1f4ab'  // Replace with a private key from Ganache
      ]
    }
  }
};
