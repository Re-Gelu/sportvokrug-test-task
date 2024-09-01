import { ApolloClient, InMemoryCache } from "@apollo/client";

import configuration from "./configuration";

export * from "./api.types";

export const apolloClient = new ApolloClient({
  uri: configuration.API_URL,
  cache: new InMemoryCache(),
});
