import { ApolloServer } from "apollo-server-cloud-functions";
import * as functions from "firebase-functions";

import { typeDefs } from "../graphql/typedefs";
import { resolvers } from "../graphql/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
});

const gqlServer = server.createHandler();

export const graphql = functions.https.onRequest(
  async (req, res) =>
    void (await new Promise<string>((done) => {
      gqlServer(req, res, done);
    }))
);
