import { NonEmptyArray } from "type-graphql";

import { PostResolver } from "./post.resolver";
import { UserResolver } from "./user.resolver";
import { MenuItemResolver } from "./menuitem.resolver";

export const resolvers: NonEmptyArray<Function> = [PostResolver, UserResolver,MenuItemResolver];
