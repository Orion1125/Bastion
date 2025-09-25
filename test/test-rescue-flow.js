const ImportManager = require('../src/importManager');
const RescueBuilder = require('../src/rescueBuilder');
const { Wallet, utils } = require('ethers');

async function run() {
  console.log('Test rescue flow');

  // sponsor wallet
  const sponsor = Wallet.createRandom();

  // compromised wallet (imported via mnemonic)
  const mnemonic = Wallet.createRandom().mnemonic.phrase;
  const { wallet: compromisedWallet } = ImportManager.importMnemonic(mnemonic);

  const safe = Wallet.createRandom();

  const builder = new RescueBuilder({ sponsorWallet: sponsor, compromisedAddress: compromisedWallet.address, safeAddress: safe.address, chainId: 1 });

  // sample calldata (unstake/claim style) - use arbitrary bytes
  const calldata = utils.hexlify(utils.toUtf8Bytes('unstake:claim'));

  const bundle = await builder.buildFromCalldata(calldata);

  console.log('Bundle metadata:');
  console.log('  sponsor:', bundle.sponsor);
  console.log('  compromised:', bundle.compromised);
  console.log('  safe:', bundle.safe);
  console.log('  estimated gas:', bundle.estimated);
  console.log('  sponsorTx gasLimit:', bundle.sponsorTx.gasLimit);
  console.log('  rescueTx gasLimit:', bundle.rescueTx.gasLimit);

  // simple checks
  if (!bundle.estimated || bundle.estimated.totalGas <= 0) throw new Error('invalid gas estimate');

  console.log('Rescue flow test passed');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
