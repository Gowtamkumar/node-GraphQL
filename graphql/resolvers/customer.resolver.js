import { GraphQLError } from "graphql";
import CustomerModel from "../../models/customer.model.js";

const customerResolver = {
  Query: {
    getCustomers: async (__, arg, context) => {
      if (context.user.role !== "Admin") {
        throw new GraphQLError("You are not Authorized!");
      }
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

    getCustomer: async (_, { _id }, context) => {
      if (context.user.role !== "Admin") {
        throw new GraphQLError("You are not Authorized!");
      }
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
    createCustomer: async (_, { customerInput }, context) => {
      if (context.user.role !== "Admin") {
        throw new GraphQLError("You are not Authorized!");
      }
      const result = await CustomerModel.create(customerInput);
      return { ...result.doc };
    },

    deleteCustomer: async (_, { _id }, context) => {
      if (context.user.role !== "Admin") {
        throw new GraphQLError("You are not Authorized!");
      }

      try {
        const customer = await CustomerModel.findById(_id);
        if (!customer) {
          throw new Error("Customer is Not found!");
        }

        const deleteC = (await CustomerModel.deleteOne({ _id })).deletedCount;
        return {
          isSuccess: deleteC,
          message: "Customer deleted successfully",
        };
      } catch (err) {
        throw new GraphQLError(err.message);
      }
    },

    updateCustomer: async (_, { _id, customerUpdate }, context) => {
      if (context.user.role !== "Admin") {
        throw new GraphQLError("You are not Authorized!");
      }

      try {
        const customer = await CustomerModel.findById(_id);
        console.log("customerUpdate", customerUpdate);
        if (!customer) {
          throw new Error("Customer is Not found!");
        }
        await CustomerModel.updateOne({ _id }, customerUpdate);
        return {
          ...customer.doc,
          customerUpdate,
        };
      } catch (err) {
        throw new GraphQLError(err.message);
      }
    },
  },
};

export default customerResolver;
