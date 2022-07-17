import { AuthenticationError } from "apollo-server-cloud-functions";
import { Request } from "firebase-functions";

import { AuthContext, AuthenticatedUser } from "./interface";

function validateAPIKey(
  apiKey: string | string[] | undefined
): apiKey is string {
  if (!process.env.BLEND_API_KEY) {
    throw new AuthenticationError("No API Key was validated on the server");
  }
  return apiKey === process.env.BLEND_API_KEY.toLowerCase();
}

async function authenticateUser(
  _token: string | undefined
): Promise<AuthenticatedUser> {
  return Promise.resolve({
    experiments: [],
    featureFlags: [],
    id: "anonymous",
    name: "Anonymous",
    roles: [],
    username: "anonymous",
  });
}

export const createAuthContext = async (req: Request): Promise<AuthContext> => {
  const token = req.headers.authorization;
  const apiKey = req.headers["x-api-key"];

  if (!validateAPIKey(apiKey)) {
    throw new AuthenticationError("Invalid API Key was provided");
  }

  const user = await authenticateUser(token);
  if (!user) throw new AuthenticationError("Could not authenticate user");

  return {
    user,
    apiKey,
  };
};
