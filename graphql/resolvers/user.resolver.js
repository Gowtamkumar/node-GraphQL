import { GraphQLError } from "graphql";
import UserModel from "../../models/user.model.js";

const userResolver = {
  Query: {
    getUsers: async (_, arg) => {
      try {
        const result = await UserModel.find();
        if (!result.length) {
          console.log("Not found User");
        }
        return result;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    getUser: async (_, { _id }) => {
      try {
        const result = await UserModel.findById(_id);
        if (!result) {
          throw new GraphQLError(error.message);
        }
        return result;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    createUser: async (_, { userCreate }) => {
      const result = await UserModel.create(userCreate);
      return result;
    },
    updateUser: async (_, { _id, userUpdate }) => {
      const user = await UserModel.findById(_id);
      if (!user) {
        throw new Error("User is Not found!");
      }

      await UserModel.updateOne({ _id }, userUpdate);
      return {
        ...user,
        userUpdate,
      };
    },
    deleteUser: async (_, { _id }) => {
      try {
        const result = await UserModel.findById(_id);
        if (!result) {
          throw new Error("User is Not found!");
        }

        const isDeleted = await UserModel.deleteOne({ _id });
        return {
          isSuccess: isDeleted,
          message: "User deleted successfully",
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

export default userResolver;
