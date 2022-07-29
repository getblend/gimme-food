import { initializeAuth } from "./auth";
import { initializeFirebase } from "./firebase";
import { initializeSecrets } from "./secrets";

import type { ExpressContext } from "apollo-server-express";
import type { Auth } from "./auth";

let isInitialized: boolean;

export interface IContext {
  auth: Auth | undefined;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export async function initializeContext({
  req,
}: ExpressContext): Promise<IContext> {
  // Things that are done only once
  if (!isInitialized) {
    initializeSecrets();
    initializeFirebase();
    isInitialized = true;
  }

  // Things that are done on every request
  const auth = await initializeAuth(req);

  // Information that is available via @Ctx()
  return { auth };
}

export type { Auth } from "./auth";
export { withBoilerplate } from "./withBoilerplate";
