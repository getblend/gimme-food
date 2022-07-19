import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { Container, Service, Token } from "typedi";

const DATABASE_URL = new Token<string>("DATABASE_URL");
export const BLEND_CLIENT_EMAIL = new Token<string>("BLEND_CLIENT_EMAIL");
export const BLEND_PROJECT_ID = new Token<string>("BLEND_PROJECT_ID");
export const BLEND_ADMIN_KEY = new Token<string>("BLEND_ADMIN_KEY");
export const BLEND_API_KEY = new Token<string>("BLEND_API_KEY");
export const DEBUG_MODE = new Token<boolean>("DEBUG_MODE");

@Service()
export class CoreContext {
  readonly db: admin.firestore.Firestore;

  constructor() {
    functions.logger.debug("Creating CoreContext");
    this.#parseSecrets();

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          clientEmail: Container.get(BLEND_CLIENT_EMAIL),
          projectId: Container.get(BLEND_PROJECT_ID),
          // replace `\` and `n` character pairs w/ single `\n` character
          privateKey: Container.get(BLEND_ADMIN_KEY).replace(/\\n/g, "\n"),
        }),
        databaseURL: Container.get(DATABASE_URL),
      });
    }

    this.db = admin.firestore();
  }

  get logger(): typeof functions.logger {
    return functions.logger;
  }

  get isDevelopment(): boolean {
    return Container.get(DEBUG_MODE);
  }

  #parseSecrets(): void {
    const secrets = process.env;
    if (!this.#validateEnv(secrets)) {
      this.logger.error("Missing environment variables", process.env);
      throw new Error(
        "Environment variables are set incorrectly or are missing."
      );
    }
    Container.set(BLEND_CLIENT_EMAIL, secrets["BLEND_CLIENT_EMAIL"]);
    Container.set(BLEND_PROJECT_ID, secrets["BLEND_PROJECT_ID"]);
    Container.set(BLEND_ADMIN_KEY, secrets["BLEND_ADMIN_KEY"]);
    Container.set(BLEND_API_KEY, secrets["BLEND_API_KEY"]);
    Container.set(DATABASE_URL, secrets["DATABASE_URL"]);

    if (process.env.FUNCTIONS_EMULATOR) {
      process.env.FIRESTORE_EMULATOR_HOST = "localhost:9199";
    }
    Container.set(DEBUG_MODE, !!process.env.FUNCTIONS_EMULATOR);
  }

  #validateEnv(env: NodeJS.ProcessEnv): env is NodeJS.ProcessEnv & {
    BLEND_CLIENT_EMAIL: string;
    BLEND_PROJECT_ID: string;
    BLEND_ADMIN_KEY: string;
    BLEND_API_KEY: string;
    DATABASE_URL: string;
  } {
    return !!(
      env.BLEND_CLIENT_EMAIL &&
      env.BLEND_PROJECT_ID &&
      env.BLEND_ADMIN_KEY &&
      env.BLEND_API_KEY &&
      env.DATABASE_URL
    );
  }
}
