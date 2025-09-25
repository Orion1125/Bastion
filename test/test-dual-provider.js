const BastionProvider = require('../src/provider');
const DualProvider = require('../src/dualProvider');
const SmartAccount = require('../src/smartAccount');
const { Wallet, utils } = require('ethers');

async function testInjected() {
  const wallet = Wallet.createRandom();
  const injected = new BastionProvider(wallet.privateKey, 1);
  const dual = new DualProvider({ mode: 'injected', injectedProvider: injected });
  const account = new SmartAccount(dual);

  const addr = await account.getAddress();
  if (addr.toLowerCase() !== wallet.address.toLowerCase()) throw new Error('injected address mismatch');
  console.log('Injected mode OK');
}

async function testWalletConnect() {
  // mock walletconnect client that supports request({ method, params })
  const wallet = Wallet.createRandom();
  const mockWC = {
    async request(args) {
      // forward to a BastionProvider internally for testing
      const provider = new BastionProvider(wallet.privateKey, 1);
      return provider.request(args);
    }
  };

  const dual = new DualProvider({ mode: 'walletconnect', walletConnectClient: mockWC });
  const account = new SmartAccount(dual);
  const addr = await account.getAddress();
  if (addr.toLowerCase() !== wallet.address.toLowerCase()) throw new Error('walletconnect address mismatch');
  console.log('WalletConnect mode OK');
}

async function run() {
  await testInjected();
  await testWalletConnect();
  console.log('DualProvider tests passed');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
