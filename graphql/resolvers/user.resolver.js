import { GraphQLError } from "graphql";
import UserModel from "../../models/user.model.js";

const userResolver = {
  Query: {
    getUsers: async (_, arg) => {
      try {
        const result = await UserModel.find();
        if (!result.length) {
          throw new GraphQLError("User not found!");
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
    signup: async (_, { input }) => {
      const { name, username, email, password, role } = input;
      const oldUser = await UserModel.findOne({ email });

      if (oldUser) {
        throw new GraphQLError("This user already register with email");
      }
      const user = await UserModel.create({
        name,
        username,
        email,
        password,
        role,
      });
      const token = user.getSignJwtToken();
      return {
        ...user._doc,
        token: token,
      };
    },

    signin: async (_, { input }) => {
      const { email, password } = input;
      const oldUser = await UserModel.findOne({ email });
      // check for user
      if (!oldUser) {
        throw new GraphQLError("Your email address is not valid");
      }
      // checking right password
      const isMatch = await oldUser.mathchPassword(password);
      if (!isMatch) {
        throw new GraphQLError("User is not authenticated");
      }

      const token = await oldUser.getSignJwtToken();

      return {
        ...oldUser._doc,
        token: token,
      };
    },

    updateUser: async (_, { _id, userUpdate }) => {
      const user = await UserModel.findById(_id);
      if (!user) {
        throw new GraphQLError("User is not found!");
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
          throw new GraphQLError("User is Not found!");
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
