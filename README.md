Bastion - minimal smart-account injected provider demo

This repository contains a small demo of a smart-contract wallet-like injected provider that behaves like an EOA for common operations: accounts, sign, and sendTransaction.

Files added:
- `src/provider.js` - a minimal EIP-1193-like provider wrapping an ethers Wallet.
- `src/smartAccount.js` - a thin smart-account wrapper that uses the provider and exposes EOA-like methods.
- `test/test-provider.js` - simple test/runner to validate behavior.
- `package.json` - minimal manifest.

Run the test:

```bash
npm install
npm test
```

Notes: This is a local/demo implementation. It does not deploy or interact with real account abstraction contracts or a bundler/relayer. It demonstrates the injected-provider pattern and an API that behaves like an EOA.
# Bastion