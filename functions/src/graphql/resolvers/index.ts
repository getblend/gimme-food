import { PostResolver } from "./post.resolver";
import { StoreResolver } from "./store.resolver";
import { UserResolver } from "./user.resolver";

export const resolvers = [PostResolver, UserResolver,StoreResolver] as const;
