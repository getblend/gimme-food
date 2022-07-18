import { ApolloServer } from "apollo-server-cloud-functions";
import type { PluginDefinition } from "apollo-server-core";
import * as functions from "firebase-functions";
import { buildSchemaSync } from "type-graphql";

import { createContext } from "./context";
import { resolvers } from "./resolvers";

const debugMode = !!process.env.FUNCTIONS_EMULATOR;

const loggingPlugin: PluginDefinition = {
  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart(requestContext) {
    functions.logger.info(
      `[GQL] ${requestContext.request.operationName}`,
      requestContext.request.query,
      requestContext.request.variables
    );

    return {
      async didEncounterErrors(errors) {
        functions.logger.error("[GQL] Error", errors);
      },
    };
  },
};

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
  plugins: [loggingPlugin],
  logger: functions.logger,
  introspection: true,
});

const graphqlHandler = server.createHandler();
export const graphql = functions
  .region("asia-east1")
  .https.onRequest(graphqlHandler as any);
