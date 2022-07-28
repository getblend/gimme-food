import type { ExpressContext } from "apollo-server-express";

import type { AuthenticatedUser } from "./data/auth.repository";

export { CoreContext } from "./core.context";
export * from "./data";

export interface RequestContext extends ExpressContext {
  user: AuthenticatedUser | undefined;
}
