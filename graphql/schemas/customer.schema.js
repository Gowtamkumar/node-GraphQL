import gql from "graphql-tag";

const customerSchema = gql`
  type Customer {
    _id: String
    name: String
    phone: String
    email: String
    address: String
  }

  input CustomerInput {
    name: String!
    phone: String
    email: String
    address: String
  }

  input CustomerUpdate {
    name: String!
    phone: String
    email: String
    address: String
  }

  type CustomerSuccess {
    isSuccess: Boolean
    message: String!
  }

  type Query {
    getCustomers: [Customer]
    getCustomer(_id: ID!): Customer!
  }

  type Mutation {
    createCustomer(customerInput: CustomerInput): Customer!
    deleteCustomer(_id: ID!): CustomerSuccess!
    updateCustomer(_id: ID!, customerUpdate: CustomerUpdate): Customer!
  }
`;

export default customerSchema;
