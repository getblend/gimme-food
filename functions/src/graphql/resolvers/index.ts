import { NonEmptyArray } from "type-graphql";

import { PostResolver } from "./post.resolver";
import { UserResolver } from "./user.resolver";
import { ItemResolver } from "./item.resolver";

export const resolvers: NonEmptyArray<Function> = [PostResolver, UserResolver,ItemResolver];
