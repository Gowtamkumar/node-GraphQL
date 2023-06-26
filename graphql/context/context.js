import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
import UserModel from "../../models/user.model.js";
import configEnv from "../../config/config.js";

const getUser = async (token) => {
  try {
    if (token) {
      const decoded = jwt.verify(token, configEnv.JWT_SECRET);
      const user = await UserModel.findById(decoded._id);
      return user;
    }

    return null;
  } catch (error) {
    return null;
  }
};

const context = async ({ req }) => {
  const { operationName } = req.body;
  if (operationName === "IntrospectionQuery") {
    // console.log('blocking introspection query..');
    return {};
  }

  // console.log('Allow Signup and Signin Mutation');
  if (operationName === "Signup" || operationName === "Signin") {
    return {};
  }

  const token = req.headers.bearer || "";

  const user = await getUser(token);

  if (!user) {
    throw new GraphQLError("User is not Authenticated");
  }

  // Add the user to the context
  return { user };
};

export default context;
