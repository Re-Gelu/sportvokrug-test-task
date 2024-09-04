import "@mantine/core/styles.css";
import "unfonts.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { apolloClient } from "@/shared/api";
import { theme } from "@/shared/theme";
import { ApolloProvider } from "@apollo/client";
import { Center, MantineProvider } from "@mantine/core";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Center h="100dvh">
          <App />
        </Center>
      </MantineProvider>
    </ApolloProvider>
  </StrictMode>
);
