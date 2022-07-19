import { AuthenticationError } from "apollo-server-cloud-functions";
import { Request } from "firebase-functions";
import { Container, Service } from "typedi";

import { BLEND_API_KEY, DEBUG_MODE } from "../core.context";

export interface AuthenticatedUser {
  id: string;
  username: string;
  roles: string[];
  featureFlags: string[];
  experiments: string[];
}

@Service()
export class AuthRepository {
  validateAPIKey(_request: Request): boolean {
    if (Container.get(DEBUG_MODE)) return true;

    const isAPIKeyValid =
      String(_request.headers["x-api-key"]).toLowerCase() ===
      Container.get(BLEND_API_KEY).toLowerCase();

    if (!isAPIKeyValid) {
      throw new AuthenticationError("Invalid API key");
    }
    return isAPIKeyValid;
  }

  async authenticate(
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
}
