import * as dotenv from "dotenv";
import * as express from "express";
import rateLimit from "express-rate-limit";
import * as functions from "firebase-functions";
import helmet from "helmet";
import { createPosts } from "./models/post";
import { downloadPosts } from "./models/unsplash";
import routes from "./routes";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

dotenv.config();

const server = express();

// Apply the rate limiting middleware to all requests
server.use(limiter);

// Helmet to block unwanted http attacks
server.use(helmet());

// Describing the API routes
server.use("/", routes);

export const api = functions.https.onRequest(server);

export const scheduledDownload = functions.pubsub
  .schedule("0 0 * * *")
  .onRun(async () => {
    dotenv.config();
    functions.logger.info("Downloading latest from unsplash");
    const posts = await downloadPosts(50);
    await createPosts(posts);
    functions.logger.log("Updated with new records...");
  });
