
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const SERVER_ADDED = '192.168.254.115:4000';

const httpLink = new HttpLink({
  uri: `http://${SERVER_ADDED}/graphql`
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export { ApolloProvider, client }