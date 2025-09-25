class SmartAccount {
  constructor(provider) {
    if (!provider) throw new Error('provider required');
    this.provider = provider;
  }

  async getAddress() {
    const accounts = await this.provider.request({ method: 'eth_accounts' });
    return accounts[0];
  }

  // behave like EOA sign
  async signMessage(message) {
    // message should be hex or string per provider implementation
    return this.provider.request({ method: 'personal_sign', params: [message, await this.getAddress()] });
  }

  // behave like EOA sendTransaction: wrap to provider eth_sendTransaction
  async sendTransaction(tx) {
    return this.provider.request({ method: 'eth_sendTransaction', params: [tx] });
  }
}

module.exports = SmartAccount;
