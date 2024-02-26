import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@styling/globals.css";
import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/500.css";
import "@fontsource/geist-sans/600.css";
import { Web3Modal } from "@connector/web3Modal";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Web3Modal>
      <>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
      </>
    </Web3Modal>
  </React.StrictMode>
);
