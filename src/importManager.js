const { Wallet } = require('ethers');
const BastionProvider = require('./provider');

class ImportManager {
  // Import from a raw private key (0x... or hex)
  static importPrivateKey(privateKey, chain = { chainId: 1 }) {
    const wallet = new Wallet(privateKey);
    const provider = new BastionProvider(wallet.privateKey, chain);
    return { wallet, provider };
  }

  // Import from a mnemonic/secret phrase
  static importMnemonic(mnemonic, path = "m/44'/60'/0'/0/0", chain = { chainId: 1 }) {
    const wallet = Wallet.fromMnemonic(mnemonic, path);
    const provider = new BastionProvider(wallet.privateKey, chain);
    return { wallet, provider };
  }
}

module.exports = ImportManager;
