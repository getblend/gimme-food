import { ApolloServer } from "apollo-server-cloud-functions";
import * as functions from "firebase-functions";
import { buildSchemaSync } from "type-graphql";
import { Container } from "typedi";

import { initializeContext } from "../services/core";
import { resolvers } from "./resolvers";

import type { PluginDefinition } from "apollo-server-core";

const requestPlugin: PluginDefinition = {
  async serverWillStart({ logger }) {
    logger.info("[GQL] Server is starting");

    return {
      async serverWillStop(): Promise<void> {
        logger.info("[GQL] Server is stopping");
      },

      schemaDidLoadOrUpdate(): void {
        logger.info("[GQL] Schema was loaded");
      },
    };
  },

  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart({ request, logger }) {
    logger.info(`[GQL] ${request.operationName} ${request.query}`);

    return {
      async didEncounterErrors(errors): Promise<void> {
        functions.logger.error("[GQL] Error", errors);
      },
    };
  },
};

const schema = buildSchemaSync({
  container: Container,
  resolvers,
});

const server = new ApolloServer({
  allowBatchedHttpRequests: true,
  cache: "bounded",
  context: initializeContext,
  csrfPrevention: true,
  debug: true,
  introspection: true,
  logger: functions.logger,
  schema,
  plugins: [requestPlugin],
});

const handler = server.createHandler();

export const graphql = functions
  .region("asia-east1")
  .https.onRequest((req, res) => {
    try {
      handler(req, res, () => undefined);
    } catch (error) {
      functions.logger.error(error);
      res.status(500).send("Something went wrong when handling the request.");
    }
  });
