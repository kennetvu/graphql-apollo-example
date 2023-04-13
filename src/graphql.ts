import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'World',
  },
};

const schema = makeExecutableSchema({ typeDefs });
const schemaWithMocks = addMocksToSchema({
  schema,
  resolvers,
});

const apolloCache = new InMemoryCache((window as any).__APOLLO_STATE__);

export const graphqlClient = new ApolloClient({
  cache: apolloCache,
  link: new SchemaLink({ schema: schemaWithMocks }),
});
