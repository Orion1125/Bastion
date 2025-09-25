const BastionProvider = require('../src/provider');
const SmartAccount = require('../src/smartAccount');
const { Wallet, utils } = require('ethers');

async function run() {
  console.log('Starting Bastion provider test');
  const wallet = Wallet.createRandom();
  const provider = new BastionProvider(wallet.privateKey, 1337);
  const account = new SmartAccount(provider);

  const addr = await account.getAddress();
  console.log('Address:', addr);

  if (addr.toLowerCase() !== wallet.address.toLowerCase()) {
    throw new Error('account mismatch');
  }

  // sign message
  const message = utils.toUtf8Bytes('hello bastion');
  const sig = await account.signMessage(message);
  console.log('Signature length:', sig.length);

  // sendTransaction (simulated)
  const tx = { to: wallet.address, value: '0x0', nonce: 0 };
  const txHash = await account.sendTransaction(tx);
  console.log('TxHash:', txHash);

  // quick sanity checks
  if (!txHash || !txHash.startsWith('0x')) {
    throw new Error('invalid txHash');
  }

  console.log('All tests passed');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
