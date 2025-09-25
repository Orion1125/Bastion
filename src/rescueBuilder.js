const { utils, Wallet, BigNumber } = require('ethers');

// rescueBuilder builds an "atomic" bundle for rescuing funds when a wallet is compromised.
// It takes an unstake/claim calldata and produces two transactions:
//  - sponsorTx: a transaction from a sponsor that pays for gas / calls entrypoint (simulated)
//  - rescueTx: a transaction from the compromised wallet that transfers funds to a safe wallet
// The builder returns a bundle object with metadata including gas estimates and timing info.

class RescueBuilder {
  constructor({ sponsorWallet, compromisedAddress, safeAddress, chain = { chainId: 1 } }) {
    if (!sponsorWallet) throw new Error('sponsorWallet required');
    if (!compromisedAddress) throw new Error('compromisedAddress required');
    if (!safeAddress) throw new Error('safeAddress required');
    this.sponsorWallet = sponsorWallet;
    this.compromisedAddress = compromisedAddress;
    this.safeAddress = safeAddress;
    this.chain = typeof chain === 'number' ? { chainId: chain } : chain;
    this.chainId = this.chain.chainId;
  }

  // Build bundle from calldata for an unstake/claim-like action
  async buildFromCalldata(calldataHex) {
    if (!calldataHex || typeof calldataHex !== 'string') throw new Error('calldataHex required');

    const timestamp = Date.now();

    // Simulate gas estimation: base plus calldata size
    const calldataBytes = utils.arrayify(calldataHex);
    const calldataGas = calldataBytes.length * 16; // rough per-byte cost
    const baseGas = 21000;
    const rescueGas = baseGas + calldataGas + 50000; // extra for internal calls
    const sponsorGas = 30000 + calldataGas;

    // Build rescue tx (from compromised address): transfer all to safeAddress
    const rescueTx = {
      from: this.compromisedAddress,
      to: this.safeAddress,
      value: '0x0',
      data: calldataHex,
      gasLimit: BigNumber.from(rescueGas).toHexString(),
      chainId: this.chainId
    };

    // sponsor tx (from sponsorWallet) - typically calls bundler/entrypoint; here we simulate
    const sponsorTx = {
      from: this.sponsorWallet.address,
      to: this.compromisedAddress,
      value: '0x0',
      data: '0x',
      gasLimit: BigNumber.from(sponsorGas).toHexString(),
      chainId: this.chainId
    };

    const estimated = {
      rescueGas: rescueGas,
      sponsorGas: sponsorGas,
      totalGas: rescueGas + sponsorGas
    };

    const bundle = {
      timestamp,
      sponsorTx,
      rescueTx,
      estimated,
      sponsor: this.sponsorWallet.address,
      compromised: this.compromisedAddress,
      safe: this.safeAddress,
      chain: this.chain
    };

    return bundle;
  }
}

module.exports = RescueBuilder;
