
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from "apollo-upload-client";

// const SERVER_ADDED = 'localhost:4000';
const SERVER_ADDED = '13.210.177.188:4000';

const httpLink = new HttpLink({
  uri: `http://${SERVER_ADDED}/graphql`
});

const client = new ApolloClient({
  link: from([httpLink, createUploadLink]),
  cache: new InMemoryCache()
});

export { ApolloProvider, client, SERVER_ADDED }