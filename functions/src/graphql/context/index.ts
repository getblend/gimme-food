import type { ContextFunction } from "apollo-server-core";
import type { ExpressContext } from "apollo-server-express";

import { createAuthContext } from "./auth.context";
import { createCoreContext } from "./core.context";
import { createDataContext } from "./data";
import { Context } from "./interface";

export const createContext: ContextFunction<ExpressContext, Context> = async (
  request
) => {
  let context = {} as Context;

  context.core = createCoreContext();
  context.data = createDataContext(context);
  context.auth = await createAuthContext(context, request.req);
  context.request = request;

  return context;
};

export { Context };
