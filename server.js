import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import "dotenv/config";
import { startStandaloneServer } from "@apollo/server/standalone";
// The GraphQL schema with resolvers
import allTypeDefs from "./graphql/schemas/index.js";
import allResolver from "./graphql/resolvers/index.js";
import authContext from "./graphql/context/context.js";
import configEnv from "./config/config.js";
// database
const MONGO_URI = configEnv.MONGO_URI;
const PORT = configEnv.PORT;

const server = new ApolloServer({
  typeDefs: allTypeDefs,
  resolvers: allResolver,
});

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connect Successfully");
    return startStandaloneServer(server, {
      listen: { port: PORT },
      context: authContext,
    });
  })
  .then((res) => {
    console.log(`server running at ${res.url}`);
  });
