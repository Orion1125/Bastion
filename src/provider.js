const { Wallet, utils } = require('ethers');

class BastionProvider {
  // chain can be a number (chainId) or an object { chainId, rpc, name }
  constructor(privateKey, chain = { chainId: 1 }) {
    if (!privateKey) throw new Error('privateKey required');
    this.wallet = new Wallet(privateKey);
    this.chain = typeof chain === 'number' ? { chainId: chain } : chain;
    this.chainId = this.chain.chainId;
    this.rpc = this.chain.rpc;
    this.isBastion = true;
  }

  // EIP-1193 style request
  async request(args) {
    const { method, params } = args;
    switch (method) {
      case 'eth_accounts':
      case 'eth_requestAccounts':
        return [this.wallet.address.toLowerCase()];

      case 'personal_sign': {
        // params: [message, address]
        const message = params[0];
        // ethers Wallet.signMessage accepts string or bytes
        return await this.wallet.signMessage(utils.arrayify(message));
      }

      case 'eth_sendTransaction': {
        // params[0] = tx object
        const tx = params[0];
        // build a serialized tx-like object and sign
        const populated = Object.assign({}, tx);
        populated.chainId = populated.chainId || this.chainId;
        // use ethers to sign a transaction (requires numeric fields as numbers/hex)
        const signed = await this.wallet.signTransaction(populated);
        // return a fake tx hash (keccak of signed)
        return utils.keccak256(signed);
      }

      default:
        throw new Error('Unsupported method ' + method);
    }
  }
}

module.exports = BastionProvider;
