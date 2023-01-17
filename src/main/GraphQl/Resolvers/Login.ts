import { ApolloServerResolverAdapter } from '@main/adapters';
import { makeLoginController } from '@main/factories';

export default {
  Query: {
    async login(_: any, args: any) {
      return ApolloServerResolverAdapter(makeLoginController(), args);
    },
  },
};
