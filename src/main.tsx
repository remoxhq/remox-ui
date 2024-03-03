import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@styling/globals.css";
import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/500.css";
import "@fontsource/geist-sans/600.css";
import { Connector } from "@connector/index";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Connector>
      <>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </>
    </Connector>
  </React.StrictMode>
);
