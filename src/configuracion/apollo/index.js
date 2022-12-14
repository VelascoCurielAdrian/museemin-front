import { ApolloClient, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { cache } from './cache';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  // uri: 'http://192.168.119.194:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${JSON.parse(token).name}`: '' 
    }
  }
});

const client = new ApolloClient({
  connectToDevTools:true,
  cache: cache,
  link: authLink.concat( httpLink )
});

export default client;

