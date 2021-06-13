require('babel-register');
require('babel-polyfill');

const { url, mnemonic, wss } = require('./secrets.json');
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, wss);
      },
      network_id: 3,
      gas: 4000000,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 200,
      skipDryRun: true,
      confirmations:2
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  }
}
