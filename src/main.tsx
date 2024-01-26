import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { createWeb3Modal } from "@web3modal/wagmi1/react";
import { WagmiConfig } from "wagmi";
import { projectId, wagmiConfig, chains } from "./config.ts";
import './index.css'

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains, themeVariables: {
  '--w3m-border-radius-master': '1px',
  // '--w3m-accent': '#666666',
  '--w3m-color-mix': '#352197',
  '--w3m-color-mix-strength': 30
} });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);
