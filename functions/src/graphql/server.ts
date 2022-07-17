import { ApolloServer } from "apollo-server-cloud-functions";
import * as functions from "firebase-functions";
import * as path from "path";
import { buildSchemaSync } from "type-graphql";

import { createContext } from "./context";
import { resolvers } from "./resolvers";

const schema = buildSchemaSync({
  resolvers,
  emitSchemaFile: {
    path: path.resolve(__dirname, "../graphql/schema.gql"),
    commentDescriptions: true,
    sortedSchema: true,
  },
});

const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache: "bounded",
  context: createContext,
  allowBatchedHttpRequests: true,
});

const graphqlHandler = server.createHandler();
export const graphql = functions.https.onRequest(graphqlHandler as any);
