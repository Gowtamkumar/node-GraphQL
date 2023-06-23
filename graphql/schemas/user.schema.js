import gql from "graphql-tag";

const userSchema = gql`
  input UserCreate {
    name: String
    userName: String
    email: String
    password: String
  }

  input UserUpdate {
    name: String
    userName: String
    email: String
    password: String
  }

  type UserSuccess {
    isSuccess: Boolean
    message: String!
  }
  type Query {
    getUsers: [User]
    getUser(_id: ID!): User!
  }

  type Mutation {
    createUser(userCreate: UserCreate): User!
    deleteUser(_id: ID!): UserSuccess!
    updateUser(_id: ID!, userUpdate: UserUpdate): User!
  }
`;

export default userSchema;
