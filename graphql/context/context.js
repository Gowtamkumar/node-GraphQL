import jwt from "jsonwebtoken";

import { GraphQLError } from "graphql";
import UserModel from "../../models/user.model.js";

const getUser = async (token) => {
  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
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

  const token = req.headers.authorization || "";
  console.log("req", req);

  const user = await getUser(token);
  if (!user) {
    throw new GraphQLError("User is not Authenticated");
    // throwCustomError("User is not Authenticated", ErrorTypes.UNAUTHENTICATED);
  }

  // Add the user to the context
  return { user };
};

export default context;
