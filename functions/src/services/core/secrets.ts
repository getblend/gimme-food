import { Container, Token } from "typedi";

export interface ISecrets {
  BLEND_ADMIN_KEY: string;
  BLEND_API_KEY: string;
  BLEND_CLIENT_EMAIL: string;
  BLEND_PROJECT_ID: string;
  DATABASE_URL: string;
  FUNCTIONS_EMULATOR: string;
  MONGO_DB_URL: string;
  WEB_MENU_API_URL: string;
}

function validateEnv(
  env: NodeJS.ProcessEnv
): env is NodeJS.ProcessEnv & ISecrets {
  return !!(
    env.BLEND_CLIENT_EMAIL &&
    env.BLEND_PROJECT_ID &&
    env.BLEND_ADMIN_KEY &&
    env.BLEND_API_KEY &&
    env.DATABASE_URL &&
    env.MONGO_DB_URL &&
    env.WEB_MENU_API_URL
  );
}

export const Secrets = new Token<ISecrets>();

export function initializeSecrets(): void {
  const secrets = process.env;

  if (!validateEnv(secrets)) {
    throw new Error(
      "Environment variables are set incorrectly or are missing."
    );
  }

  if (process.env.FUNCTIONS_EMULATOR) {
    process.env.FIRESTORE_EMULATOR_HOST = "localhost:9199";
  }

  Container.set(Secrets, {
    BLEND_ADMIN_KEY: secrets["BLEND_ADMIN_KEY"],
    BLEND_API_KEY: secrets["BLEND_API_KEY"],
    BLEND_CLIENT_EMAIL: secrets["BLEND_CLIENT_EMAIL"],
    BLEND_PROJECT_ID: secrets["BLEND_PROJECT_ID"],
    DATABASE_URL: secrets["DATABASE_URL"],
    FUNCTIONS_EMULATOR: secrets["FUNCTIONS_EMULATOR"],
    MONGO_DB_URL: secrets["MONGO_DB_URL"],
    WEB_MENU_API_URL: secrets["WEB_MENU_API_URL"],
  });
}
