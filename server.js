import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// The GraphQL schema with resolvers
import allTypeDefs from "./graphql/schemas/index.js";
import allResolver from "./graphql/resolvers/index.js";
// database
const mongo_url =
  "mongodb+srv://gowtampaul0:qNrzPMzK7PXQvrhI@cluster0.zusv9tn.mongodb.net/?retryWrites=true&w=majority";

const PORT = 4000;

console.log(process.env.MONGO_URI);

const server = new ApolloServer({
  typeDefs: allTypeDefs,
  resolvers: allResolver,
});

mongoose
  .connect(mongo_url, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connect Successfully");
    return startStandaloneServer(server, {
      listen: { port: PORT },
      // context: context,
    });
  })
  .then((res) => {
    console.log(`server running at ${res.url}`);
  });
