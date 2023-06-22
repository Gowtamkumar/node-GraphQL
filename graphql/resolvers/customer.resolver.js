import { GraphQLError } from "graphql";
import CustomerModel from "../../models/customer.model.js";

const customerResolver = {
  Query: {
    getCustomers: async (__, arg) => {
      try {
        const customers = await CustomerModel.find();
        if (!customers.length) {
          console.log("Not found customers");
        }
        return customers;
      } catch (err) {
        throw new GraphQLError(err.message);
      }
    },
    getCustomer: async (_, { _id }) => {
      try {
        const customer = await CustomerModel.findById(_id);
        if (!customer) {
          throw new Error("Parameter is not a number!");
        }
        return customer;
      } catch (err) {
        throw new GraphQLError(err.message);
      }
    },
  },

  Mutation: {
    createCustomer: async (_, { customerInput }) => {
      console.log(customerInput);
      const result = await CustomerModel.create(customerInput);
      // result.save();
      return {
        id: result.id,
        ...result,
      };
    },
    deleteCustomer: () => "Delete cutstomer",
    updateCustomer: () => "Update cutstomer",
  },
};

export default customerResolver;
