import gql from "graphql-tag";

const userTypeDefs = gql`
  type User {
    _id: String
    name: String
    userName: String
    email: String
    password: String
  }
`;
export default userTypeDefs;
