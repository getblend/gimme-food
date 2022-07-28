import { ApolloServer } from "apollo-server-cloud-functions";
import { buildSchemaSync } from "type-graphql";
import { Inject, Service, Container } from "typedi";
import * as functions from "firebase-functions";

import { AuthRepository, CoreContext } from "./context";
import { resolvers } from "./resolvers";

import type { RequestContext } from "./context";
import type { PluginDefinition } from "apollo-server-core";

@Service()
class GQLHandler {
  @Inject() public readonly authRepository: AuthRepository;
  @Inject() public readonly coreContext: CoreContext;

  public readonly handler: functions.HttpsFunction;

  public constructor() {
    functions.logger.debug("Creating GraphQL handler");

    const schema = buildSchemaSync({
      container: Container,
      resolvers,
    });

    const loggingPlugin: PluginDefinition = {
      // Fires whenever a GraphQL request is received from a client.
      async requestDidStart(requestContext) {
        functions.logger.info(
          `[GQL] ${requestContext.request.operationName}`,
          requestContext.request.query,
          requestContext.request.variables
        );

        return {
          async didEncounterErrors(errors): Promise<void> {
            functions.logger.error("[GQL] Error", errors);
          },
        };
      },
    };

    const server = new ApolloServer({
      allowBatchedHttpRequests: true,
      cache: "bounded",
      context: async ({ req, res }): Promise<RequestContext> => ({
        req,
        res,
        user: await this.authRepository.authenticate(req),
      }),
      csrfPrevention: true,
      debug: true,
      introspection: true,
      logger: functions.logger,
      plugins: [loggingPlugin],
      schema,
    });

    this.handler = server.createHandler() as unknown as functions.HttpsFunction;
  }
}

export const graphql = functions
  .region("asia-east1")
  .https.onRequest((req, res) => {
    try {
      Container.get(GQLHandler).handler(req, res);
    } catch (error) {
      functions.logger.error(error);
      res.status(500).send(error);
    }
  });
