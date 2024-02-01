import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, avalanche, bsc, gnosis, fantom, aurora, Chain } from "viem/chains";
import { ReactNode } from "react";

const celo = {
  id: 42220,
  name: "Celo",
  network: "celo",
  nativeCurrency: {
    decimals: 18,
    name: "Celo",
    symbol: "CELO",
  },
  rpcUrls: {
    public: { http: ["https://forno.celo.org"] },
    default: { http: ["https://forno.celo.org"] },
  },
  blockExplorers: {
    etherscan: { name: "CeloScan", url: "https://explorer.celo.org" },
    default: { name: "CeloScan", url: "https://explorer.celo.org" },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 13112599,
    },
  },
} as Chain;

const base = {
  id: 8453,
  name: "Base",
  network: "base",
  nativeCurrency: {
    decimals: 18,
    name: "Eth",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://rpc.ankr.com/base/13d2feb17f054d751e0c3fa79a50735d64e3af3404e659187081a980ffdf02d7"] },
    default: { http: ["https://rpc.ankr.com/base/13d2feb17f054d751e0c3fa79a50735d64e3af3404e659187081a980ffdf02d7"] },
  },
  blockExplorers: {
    etherscan: { name: "CeloScan", url: "https://basescan.org" },
    default: { name: "CeloScan", url: "https://basescan.org" },
  },
} as Chain;

type Props = {
  children: ReactNode;
};

const projectId = import.meta.env.VITE_WalletConnect_ID;

const metadata = {
  name: "Remox.IO",
  description: "Treasury  Management for DAO",
  url: "https://remox.io",
  icons: ["/remox.png"],
};

const chains = [mainnet, polygon, optimism, arbitrum, avalanche, bsc, fantom, gnosis, celo, aurora, base];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

createWeb3Modal({ 
  wagmiConfig, 
  projectId, 
  chains, 
  defaultChain: mainnet, 
  enableAnalytics: true,
  
  themeMode:"dark",
  themeVariables:{
    "--w3m-font-family":'Geist Sans,-apple-system,system-ui,BlinkMacSystemFont,Segoe UI',
    "--w3m-z-index":100,
    "--w3m-accent":"#FF7348"
  }
});

export const Web3Modal = ({ children }: Props)=> {
  return <WagmiConfig  config={wagmiConfig}>{children}</WagmiConfig>;
}

