import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    login(email: string!, password: string!): Account!
  }

  type Account {
    accessToken: string!;
    name: string;
  };
`;
