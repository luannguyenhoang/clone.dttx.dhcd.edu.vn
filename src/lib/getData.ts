import {
  ApolloClient,
  DocumentNode,
  FetchPolicy,
  from,
  HttpLink,
  InMemoryCache
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri:
    process.env.NEXT_PUBLIC_API_GRAPHQL_DTTXDHCD ||
    "https://admindttx.dhcongdoan.vn/graphql"
});

export const apolloClient = new ApolloClient({
  ssrMode: typeof window === "undefined",
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only" as FetchPolicy,
      errorPolicy: "all"
    }
  }
});

export const getData = async (
  query: DocumentNode,
  variables?: any,
  customFetchPolicy?: FetchPolicy
) => {
  try {
    const response = await apolloClient.query({
      query,
      variables,
      fetchPolicy: customFetchPolicy || "network-only",
      errorPolicy: "all"
    });

    if (!response?.data) {
      return null;
    }

    return response.data;
  } catch (error: any) {
    console.error("getData Error:", error);
    return null;
  }
};
