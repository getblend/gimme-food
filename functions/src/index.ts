import * as dotenv from "dotenv";
import * as express from "express";
import * as functions from "firebase-functions";
import { createPosts } from "./models/post";
import { downloadPosts } from "./models/unsplash";
import routes from "./routes";

dotenv.config({ debug: true });

const server = express();
server.use("/", routes);

export const api = functions.https.onRequest(server);

export const scheduledDownload = functions.pubsub
  .schedule("0 0 * * *")
  .onRun(async () => {
    functions.logger.info("Downloading latest from Unsplash");
    const posts = await downloadPosts(50);
    await createPosts(posts);
    functions.logger.log("Updated with new records...");
  });
