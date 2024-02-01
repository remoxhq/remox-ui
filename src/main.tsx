import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@styling/globals.css";
import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/500.css";
import "@fontsource/geist-sans/600.css";
import { Provider } from "react-redux";
import { store } from "@redux/store";
import { Web3Modal } from "@connector/web3Modal";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3Modal>
        <App />
      </Web3Modal>
    </Provider>
  </React.StrictMode>
);
