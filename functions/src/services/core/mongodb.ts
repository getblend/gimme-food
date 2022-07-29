import * as mongoose from "mongoose";
import { Container } from "typedi";
import { Logger } from "./logger";
import { Secrets } from "./secrets";

export async function initializeMongoDb(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const secrets = Container.get(Secrets);
    mongoose.connect(secrets["MONGO_DB_URL"], (err: any) => {
      const logger = Container.get(Logger);
      if (err) {
        logger.error(err.message);
        reject(err);
        return;
      } else {
        logger.info("MongoDb successfully connected!");
        resolve();
        return;
      }
    });
  });
}
