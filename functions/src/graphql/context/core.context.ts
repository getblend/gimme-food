import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { CoreContext } from "./interface";

const validateEnv = (
  env: NodeJS.ProcessEnv
): env is NodeJS.ProcessEnv & {
  BLEND_CLIENT_EMAIL: string;
  BLEND_PROJECT_ID: string;
  BLEND_ADMIN_KEY: string;
  BLEND_API_KEY: string;
  DATABASE_URL: string;
} =>
  !!(
    env.BLEND_CLIENT_EMAIL &&
    env.BLEND_PROJECT_ID &&
    env.BLEND_ADMIN_KEY &&
    env.BLEND_API_KEY &&
    env.DATABASE_URL
  );

const parseSecrets = (): Partial<CoreContext> => {
  const secrets = process.env;
  if (!validateEnv(secrets)) {
    functions.logger.error("Missing environment variables");
    throw new Error(
      "Environment variables are set incorrectly or are missing."
    );
  }
  return {
    env: {
      clientEmail: secrets["BLEND_CLIENT_EMAIL"],
      projectId: secrets["BLEND_PROJECT_ID"],
      privateKey: secrets["BLEND_ADMIN_KEY"],
      blendApiKey: secrets["BLEND_API_KEY"],
      databaseURL: secrets["DATABASE_URL"],
    },
  };
};

const determineDebugMode = (): Partial<CoreContext> => {
  if (process.env.FUNCTIONS_EMULATOR) {
    process.env.FIRESTORE_EMULATOR_HOST = "localhost:9199";
    return { debugMode: true };
  }
  return { debugMode: false };
};

const initializeFirebase = (): Partial<CoreContext> => {
  const app = admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.BLEND_CLIENT_EMAIL,
      projectId: process.env.BLEND_PROJECT_ID,
      // replace `\` and `n` character pairs w/ single `\n` character
      privateKey: process.env.BLEND_ADMIN_KEY?.replace(/\\n/g, "\n"),
    }),
    databaseURL: process.env.DATABASE_URL,
  });
  const db = admin.firestore();
  const logger = functions.logger;
  return { app, db, logger };
};

export const createCoreContext = (): CoreContext => {
  const secrets = parseSecrets();
  const debugMode = determineDebugMode();
  const firebase = initializeFirebase();
  return {
    ...secrets,
    ...debugMode,
    ...firebase,
  } as CoreContext;
};
