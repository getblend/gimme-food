import { ApolloServer } from "apollo-server-cloud-functions";
import * as functions from "firebase-functions";
import * as path from "path";
import { buildSchemaSync } from "type-graphql";

import { createContext } from "./context";
import { resolvers } from "./resolvers";

const debugMode = !!process.env.FUNCTIONS_EMULATOR;

const schema = buildSchemaSync({
  resolvers,
});

const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache: "bounded",
  context: createContext,
  allowBatchedHttpRequests: true,
  debug: debugMode,
});

const graphqlHandler = server.createHandler();
export const graphql = functions
  .region("asia-east1")
  .https.onRequest(graphqlHandler as any);
