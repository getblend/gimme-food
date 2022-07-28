import { AuthenticationError } from "apollo-server-cloud-functions";

import { Container, Service } from "typedi";

import { BLEND_API_KEY, DEBUG_MODE } from "../core.context";

import type { Request } from "firebase-functions";

export interface AuthenticatedUser {
  experiments: string[];
  featureFlags: string[];
  id: string;
  roles: string[];
  username: string;
}

@Service()
export class AuthRepository {
  public async authenticate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _request: Request
  ): Promise<AuthenticatedUser | undefined> {
    return Promise.resolve({
      experiments: [],
      featureFlags: [],
      id: "anonymous",
      name: "Anonymous",
      roles: [],
      username: "anonymous",
    });
  }

  public validateAPIKey(_request: Request): boolean {
    if (Container.get(DEBUG_MODE)) return true;

    const isAPIKeyValid =
      String(_request.headers["x-api-key"]).toLowerCase() ===
      Container.get(BLEND_API_KEY).toLowerCase();

    if (!isAPIKeyValid) {
      throw new AuthenticationError("Invalid API key");
    }
    return isAPIKeyValid;
  }
}
