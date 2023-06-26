import gql from "graphql-tag";

const userTypeDefs = gql`
  type User {
    _id: String
    name: String
    username: String
    email: String
    password: String
    role: String,
    status:Boolean
  }
`;
export default userTypeDefs;
