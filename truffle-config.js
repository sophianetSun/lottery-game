/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

const HDWalletProvider = require('truffle-hdwallet-provider');
const MNEMONIC = process.env.MNEMONIC;
const INFURA_ENDPOINT = process.env.INFURA_ENDPOINT;
//const MNEMONIC = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";
//const INFURA_ENDPOINT = "https://ropsten.infura.io/v3/b794b3d17b5a4d5daaf742a4dced933d";

module.exports = {
  networks: {
    development: {
          host: "localhost",
          port: 9545,
          network_id: "*" // Match any network id},
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, INFURA_ENDPOINT);
      },
      network_id: 3
    }
  }
};