import { GraphQLError } from "graphql";
import UserModel from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
    signup: async (_, { signup }) => {
      const { name, username, email, password, role } = signup;
      const oldUser = await UserModel.findOne({ email });
      if (oldUser) {
        throw new GraphQLError("This user already register with email");
      }
      // const bcryptPassword = bcrypt.hash(password, 10);

      const user = await UserModel.create({
        name,
        username,
        email,
        password,
        role,
      });
      const token = user.getSignJwtToken();
      console.log(token);
      return {
        ...user._doc,
        token: token,
      };
    },

    // signin: (_, { input }) => {
    //   console.log(input);
    //   return input;
    // },

    signin: async (_, { input }) => {
      const { email, password } = input;
      const oldUser = await UserModel.findOne({ email });
      // check for user
      console.log("isMatch", input);

      if (!oldUser) {
        throw new GraphQLError("Your email addres is not valid");
      }

      const isMatch = await user.mathchPassword(password);
      console.log("isMatch", isMatch);
      if (!isMatch) {
        throw new GraphQLError("User is not Authenticated");
      }
      const token = await oldUser.getSignJwtToken();
      return {
        ...oldUser._doc,
        token: token,
      };
    },
    createUser: async (_, { userCreate }) => {
      const result = await UserModel.create(userCreate);
      return { ...result.doct };
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
