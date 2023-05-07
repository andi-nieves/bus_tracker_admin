
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const SERVER_ADDED = '13.210.177.188:4000';

const httpLink = new HttpLink({
  uri: `http://${SERVER_ADDED}/graphql`
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export { ApolloProvider, client }