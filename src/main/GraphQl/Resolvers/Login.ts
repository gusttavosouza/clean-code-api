import { ApolloServerResolverAdapter } from '@main/adapters';
import { makeLoginController, makeSignUpController } from '@main/factories';

export default {
  Query: {
    async login(_: any, args: any) {
      return ApolloServerResolverAdapter(makeLoginController(), args);
    },
  },

  Mutation: {
    async signUp(_: any, args: any) {
      return ApolloServerResolverAdapter(makeSignUpController(), args);
    },
  },
};
