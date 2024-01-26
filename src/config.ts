import { walletConnectProvider, EIP6963Connector } from "@web3modal/wagmi1";

import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import { arbitrum, base, celo, fantom, avalanche, linea, mainnet, optimism, polygon, zkSync, bsc } from "viem/chains";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

// 1. Get projectId at https://cloud.walletconnect.com
export const projectId = "121d8140200cb6da1650e56496549977";

// 2. Create wagmiConfig
export const { chains, publicClient } = configureChains(
  [mainnet, bsc, zkSync, polygon, base, linea, fantom, avalanche, arbitrum, optimism, celo],
  [walletConnectProvider({ projectId }), publicProvider()]
);

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: { projectId, showQrModal: false, metadata },
    }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({
      chains,
      options: { appName: metadata.name },
    }),
  ],
  publicClient,
});
