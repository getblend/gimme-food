import * as functions from "firebase-functions";
import { downloadRandom } from "../helpers/unsplash";
import { createPosts } from "../models/post";

export const scheduledDownload = functions.pubsub
  .schedule("0 0 * * *")
  .onRun(async () => {
    const posts = await downloadRandom();
    await createPosts(posts);
    functions.logger.info(`Updated with ${posts.length} records`);
  });
