import { AuthenticationError } from "apollo-server-cloud-functions";
import { Request } from "firebase-functions";

import { AuthContext, AuthenticatedUser, Context } from "./interface";

function validateAPIKey(
  context: Context,
  apiKey: string | string[] | undefined
): apiKey is string {
  if (context.core.debugMode) return true;

  if (!context.core.env.blendApiKey) {
    context.core.logger.error("Missing Blend API API Key in secrets");
    throw new AuthenticationError("No API Key was validated on the server");
  }

  return (
    apiKey?.toString().toLowerCase() ===
    context.core.env.blendApiKey.toLowerCase()
  );
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

export const createAuthContext = async (
  context: Context,
  req: Request
): Promise<AuthContext> => {
  const token = req.headers.authorization;
  const apiKey = req.headers["x-api-key"];

  if (!validateAPIKey(context, apiKey)) {
    context.core.logger.error("Invalid API Key provided");
    throw new AuthenticationError("Invalid API Key was provided");
  }

  const user = await authenticateUser(token);
  if (!user) {
    context.core.logger.error("Unable to authenticate user");
    throw new AuthenticationError("Could not authenticate user");
  }

  return {
    user,
  };
};
