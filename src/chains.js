// Registry of many EVM-compatible chains. Each entry contains a short name, chainId and
// an optional default RPC endpoint. This is not truly exhaustive (new chains appear),
// but it covers the widely-used networks. Add or update entries as needed.
module.exports = {
  ethereum: { name: 'ethereum', chainId: 1, rpc: 'https://mainnet.infura.io/v3/YOUR-PROJECT' },
  goerli: { name: 'goerli', chainId: 5, rpc: '' },
  sepolia: { name: 'sepolia', chainId: 11155111, rpc: '' },

  polygon: { name: 'polygon', chainId: 137, rpc: 'https://polygon-rpc.com' },
  mumbai: { name: 'mumbai', chainId: 80001, rpc: 'https://rpc-mumbai.maticvigil.com' },

  bsc: { name: 'bsc', chainId: 56, rpc: 'https://bsc-dataseed.binance.org' },
  bsc_testnet: { name: 'bsc_testnet', chainId: 97, rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545' },

  avalanche: { name: 'avalanche', chainId: 43114, rpc: 'https://api.avax.network/ext/bc/C/rpc' },
  fuji: { name: 'fuji', chainId: 43113, rpc: 'https://api.avax-test.network/ext/bc/C/rpc' },

  fantom: { name: 'fantom', chainId: 250, rpc: 'https://rpc.ftm.tools' },

  arbitrum: { name: 'arbitrum', chainId: 42161, rpc: 'https://arb1.arbitrum.io/rpc' },
  arbitrum_goerli: { name: 'arbitrum_goerli', chainId: 421613, rpc: 'https://goerli-rollup.arbitrum.io/rpc' },

  optimism: { name: 'optimism', chainId: 10, rpc: 'https://mainnet.optimism.io' },
  optimism_goerli: { name: 'optimism_goerli', chainId: 420, rpc: 'https://goerli.optimism.io' },

  gnosis: { name: 'gnosis', chainId: 100, rpc: 'https://rpc.gnosischain.com' },

  celo: { name: 'celo', chainId: 42220, rpc: 'https://forno.celo.org' },
  celo_alfajores: { name: 'celo_alfajores', chainId: 44787, rpc: 'https://alfajores-forno.celo-testnet.org' },

  moonbeam: { name: 'moonbeam', chainId: 1284, rpc: 'https://rpc.api.moonbeam.network' },
  moonriver: { name: 'moonriver', chainId: 1285, rpc: 'https://rpc.moonriver.moonbeam.network' },
  moonbase_alpha: { name: 'moonbase_alpha', chainId: 1287, rpc: 'https://rpc.testnet.moonbeam.network' },

  aurora: { name: 'aurora', chainId: 1313161554, rpc: 'https://mainnet.aurora.dev' },
  aurora_testnet: { name: 'aurora_testnet', chainId: 1313161555, rpc: '' },

  metis: { name: 'metis', chainId: 1088, rpc: 'https://andromeda.metis.io/?owner=1088' },
  metis_goerli: { name: 'metis_goerli', chainId: 599, rpc: '' },

  evmos: { name: 'evmos', chainId: 9001, rpc: 'https://evmos.publicnode.com' },

  celo_alfajores: { name: 'celo_alfajores', chainId: 44787, rpc: 'https://alfajores-forno.celo-testnet.org' },

  canto: { name: 'canto', chainId: 7700, rpc: '' },

  // newer / popular chains
  base: { name: 'base', chainId: 8453, rpc: 'https://mainnet.base.org' },
  berachain: { name: 'berachain', chainId: 2000, rpc: '' },
  story: { name: 'story', chainId: 534, rpc: '' },
  linea: { name: 'linea', chainId: 59144, rpc: 'https://linea-mainnet.infura.io/v3/YOUR-PROJECT' },
  zksync_era: { name: 'zksync_era', chainId: 324, rpc: 'https://mainnet.era.zksync.io' },
  mantle: { name: 'mantle', chainId: 5000, rpc: 'https://rpc.mantle.xyz' },
  scroll: { name: 'scroll', chainId: 534353, rpc: 'https://scroll-alpha-rpc.bwarelabs.com' },
  arbitrum_nova: { name: 'arbitrum_nova', chainId: 42170, rpc: 'https://nova.arbitrum.io/rpc' },
  polygon_zkevm: { name: 'polygon_zkevm', chainId: 1101, rpc: 'https://zkevm-rpc.com' },

  klaytn: { name: 'klaytn', chainId: 8217, rpc: '' },
  klaytn_baobab: { name: 'klaytn_baobab', chainId: 1001, rpc: '' },

  optimism_local: { name: 'optimism_local', chainId: 420420, rpc: '' },

  palm: { name: 'palm', chainId: 11297108109, rpc: '' },

  meter: { name: 'meter', chainId: 82, rpc: '' },

  rsk: { name: 'rsk', chainId: 30, rpc: 'https://public-node.rsk.co' },

  cronos: { name: 'cronos', chainId: 25, rpc: 'https://evm-cronos.crypto.org' },

  okx: { name: 'okx', chainId: 66, rpc: 'https://exchainrpc.okx.com' },

  songbird: { name: 'songbird', chainId: 19, rpc: '' },

  syscoin: { name: 'syscoin', chainId: 57, rpc: '' },

  localhost: { name: 'localhost', chainId: 1337, rpc: 'http://127.0.0.1:8545' }
};
