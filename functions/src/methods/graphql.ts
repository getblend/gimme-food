import * as path from "path";
import { ApolloServer } from "apollo-server-cloud-functions";
import * as functions from "firebase-functions";
import { buildSchemaSync } from "type-graphql";
import { PartnerResolver } from "../graphql/resolvers/partner.resolver";
import { PostResolver } from "../graphql/resolvers/post.resolver";

const schema = buildSchemaSync({
  resolvers: [PartnerResolver, PostResolver],
  emitSchemaFile: {
    path: path.resolve(__dirname, "../graphql/generated.gql"),
    commentDescriptions: true,
    sortedSchema: true,
  },
});

const server = new ApolloServer({
  schema,
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
