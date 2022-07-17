import { NonEmptyArray } from "type-graphql";

import { PostResolver } from "./post.resolver";

export const resolvers: NonEmptyArray<Function> = [PostResolver];
