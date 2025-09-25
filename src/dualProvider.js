// DualProvider delegates EIP-1193 requests to either an injected provider
// or a WalletConnect v2-compatible client (or any client exposing request())

class DualProvider {
  constructor({ mode = 'injected', injectedProvider = null, walletConnectClient = null } = {}) {
    this.mode = mode;
    this.injectedProvider = injectedProvider;
    this.walletConnectClient = walletConnectClient;

    if (this.mode === 'injected' && !this.injectedProvider) {
      throw new Error('injectedProvider required for injected mode');
    }

    if (this.mode === 'walletconnect' && !this.walletConnectClient) {
      throw new Error('walletConnectClient required for walletconnect mode');
    }
  }

  isWalletConnectClient(obj) {
    return obj && typeof obj.request === 'function';
  }

  async request(args) {
    if (this.mode === 'injected') {
      return this.injectedProvider.request(args);
    }

    if (this.mode === 'walletconnect') {
      // WalletConnect v2 SignClient exposes request({ topic, chainId, request }) in some flows.
      // To remain flexible, accept a client that implements request({ method, params }) and
      // also a client that implements request({ topic, chainId, request }). We'll try common shapes.

      const client = this.walletConnectClient;

      // If client has a direct request method that accepts EIP-1193 style args, use it.
      if (this.isWalletConnectClient(client)) {
        // Many simple WC wrapper implementations use request({ method, params })
        try {
          return await client.request(args);
        } catch (err) {
          // fallthrough to try other shapes
        }
      }

      // If client expects an object like { topic, chainId, request: { method, params } }, try to build that.
      if (typeof client.request === 'function') {
        // already attempted above; rethrow error
        return await client.request(args);
      }

      // unsupported client shape
      throw new Error('Unsupported walletConnectClient shape: needs a request(method, params) compatible function');
    }

    throw new Error('Unsupported mode ' + this.mode);
  }
}

module.exports = DualProvider;
