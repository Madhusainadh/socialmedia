import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./context/ChatProvider.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChatProvider>
  <GoogleOAuthProvider clientId="896251704494-8jkcgc6o32ni97rkd3bv1em9b24ikj2u.apps.googleusercontent.com"  >
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
    </GoogleOAuthProvider>
  </ChatProvider>
);
