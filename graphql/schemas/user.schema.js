import gql from "graphql-tag";

const userSchema = gql`
  input Signup {
    name: String
    username: String
    email: String
    password: String
    role: String
    status: Boolean
  }

  input SigninInput {
    email: String!
    password: String!
  }

  input UserUpdate {
    name: String
    username: String
    email: String
    password: String
    role: String
    status: Boolean
  }

  type UserSuccess {
    isSuccess: Boolean
    message: String!
  }
  
  type UserWithToken {
    _id: String
    username: String
    name: String
    email: String
    password: String
    role: String
    token: String
    status: Boolean
  }
  type Query {
    getUsers: [User]
    getUser(_id: ID!): User!
  }

  type Mutation {
    signup(input: Signup): UserWithToken
    signin(input: SigninInput): UserWithToken
    deleteUser(_id: ID!): UserSuccess!
    updateUser(_id: ID!, userUpdate: UserUpdate): User!
  }
`;

export default userSchema;
