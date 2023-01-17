import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';

import typeDefs from '@main/GraphQl/TypeDefs';
import resolvers from '@main/GraphQl/Resolvers';

export default (app: Express): void => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
  });
  server.applyMiddleware({ app });
};
