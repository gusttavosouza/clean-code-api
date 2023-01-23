import { ApolloServerResolverAdapter } from '@main/adapters';
import {
  makeLoadSurveyResultController,
  makeSaveSurveyResultController,
} from '@main/factories';

export default {
  Query: {
    async surveys(_: any, args: any) {
      return ApolloServerResolverAdapter(
        makeLoadSurveyResultController(),
        args,
      );
    },
  },

  Mutation: {
    async saveSurveyResult(_: any, args: any) {
      return ApolloServerResolverAdapter(
        makeSaveSurveyResultController(),
        args,
      );
    },
  },
};
