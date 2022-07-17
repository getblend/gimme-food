import type { ContextFunction } from "apollo-server-core";
import type { ExpressContext } from "apollo-server-express";

import { createAuthContext } from "./auth.context";
import { createCoreContext } from "./core.context";
import { createDataContext } from "./data";
import { Context } from "./interface";

export const createContext: ContextFunction<ExpressContext, Context> = async ({
  req,
  res,
}) => {
  let context = {} as Context;

  context = {
    auth: await createAuthContext(req),
    core: createCoreContext(),
    data: createDataContext(context),
    request: { req, res },
  };

  return context;
};

export { Context };
