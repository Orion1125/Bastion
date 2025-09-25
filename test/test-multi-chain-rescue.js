const ImportManager = require('../src/importManager');
const RescueBuilder = require('../src/rescueBuilder');
const chains = require('../src/chains');
const { Wallet, utils } = require('ethers');

async function run() {
  console.log('Multi-chain rescue test');
  const sponsor = Wallet.createRandom();
  const safe = Wallet.createRandom();

  for (const key of Object.keys(chains)) {
    const chain = chains[key];
    const mnemonic = Wallet.createRandom().mnemonic.phrase;
    const { wallet: compromisedWallet } = ImportManager.importMnemonic(mnemonic, undefined, chain);
    const builder = new RescueBuilder({ sponsorWallet: sponsor, compromisedAddress: compromisedWallet.address, safeAddress: safe.address, chain });
    const calldata = utils.hexlify(utils.toUtf8Bytes('unstake:claim-' + key));
    const bundle = await builder.buildFromCalldata(calldata);
    console.log(`- ${chain.name} (chainId=${chain.chainId}): totalGas=${bundle.estimated.totalGas}`);
    if (bundle.chain.chainId !== chain.chainId) throw new Error('chain mismatch');
  }

  console.log('Multi-chain rescue test passed');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
