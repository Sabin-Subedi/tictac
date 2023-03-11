import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GameContextProvider } from "./GameContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <GameContextProvider>
        <App />
      </GameContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
