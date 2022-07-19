import { Inject, Service, Container } from "typedi";
import { ApolloServer } from "apollo-server-cloud-functions";
import type { PluginDefinition } from "apollo-server-core";
import * as functions from "firebase-functions";
import { buildSchemaSync } from "type-graphql";

import { AuthRepository, CoreContext, RequestContext } from "./context";

import { resolvers } from "./resolvers";

let _graphqlHandler: functions.HttpsFunction;

@Service()
class GQLHandler {
  @Inject() public coreContext: CoreContext;
  @Inject() public authRepository: AuthRepository;

  readonly handler: functions.HttpsFunction;

  constructor() {
    functions.logger.debug("Creating GraphQL handler");

    const schema = buildSchemaSync({
      resolvers,
      container: Container,
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
          async didEncounterErrors(errors) {
            functions.logger.error("[GQL] Error", errors);
          },
        };
      },
    };

    const server = new ApolloServer({
      schema,
      csrfPrevention: true,
      cache: "bounded",
      context: async ({ req, res }): Promise<RequestContext> => ({
        req,
        res,
        user: await this.authRepository.authenticate(req),
      }),
      allowBatchedHttpRequests: true,
      debug: true,
      plugins: [loggingPlugin],
      logger: functions.logger,
      introspection: true,
    });

    this.handler = server.createHandler() as any;
  }
}

export const graphql = functions
  .region("asia-east1")
  .https.onRequest((res, req) => Container.get(GQLHandler).handler(res, req));
