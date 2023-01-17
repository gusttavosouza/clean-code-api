import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    login(email: string!, password: string!): Account!
  }

  extend type Mutation {
    signUp(name: string!, email: string!, password: string!, passwordConfirmation: string!): Account!
  }

  type Account {
    accessToken: string!;
    name: string;
  };
`;
