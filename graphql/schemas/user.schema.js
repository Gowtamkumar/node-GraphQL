import gql from "graphql-tag";

const userSchema = gql`
  input UserCreate {
    name: String
    username: String
    email: String
    password: String
    role: String
  }

  input Signup {
    name: String
    username: String
    email: String
    password: String
    role: String
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
  }
  type Query {
    getUsers: [User]
    getUser(_id: ID!): User!
  }

  type Mutation {
    signup(signup: Signup): UserWithToken
    signin(input: SigninInput): UserWithToken
    createUser(userCreate: UserCreate): User!
    deleteUser(_id: ID!): UserSuccess!
    updateUser(_id: ID!, userUpdate: UserUpdate): User!
  }
`;

export default userSchema;
