import { AuthenticationError } from "apollo-server-cloud-functions";
import { Container } from "typedi";

import { Secrets } from "./secrets";

import type { Request } from "firebase-functions";
import type { ISecrets } from "./secrets";

export interface Auth {
  experiments: string[];
  featureFlags: string[];
  id: string;
  roles: string[];
  token: string | undefined;
  username: string;
}

async function authenticateUser(req: Request): Promise<Auth | undefined> {
  const authorization = req.headers["authorization"];
  const token = authorization?.toLowerCase()?.split("bearer");
  const jwt = token?.[1]?.trim();
  return Promise.resolve({
    experiments: [],
    featureFlags: [],
    id: "anonymous",
    name: "Anonymous",
    roles: [],
    token: jwt,
    username: "anonymous",
  });
}

function authorizeClient(req: Request, secrets: ISecrets): boolean {
  const isAPIKeyValid =
    String(req.headers["x-api-key"]).toLowerCase() ===
    secrets["BLEND_API_KEY"].toLowerCase();

  if (!isAPIKeyValid) {
    throw new AuthenticationError("Invalid API key");
  }

  return isAPIKeyValid;
}

export async function initializeAuth(req: Request): Promise<Auth | undefined> {
  const secrets = Container.get(Secrets);
  authorizeClient(req, secrets);
  return authenticateUser(req);
}
