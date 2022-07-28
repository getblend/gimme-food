import { PostsResolver } from "./collections/posts.resolver";
import { UserResolver } from "./collections/user.resolver";
import { ImagePostResolver } from "./objects/post.resolver";

export const resolvers = [
  PostsResolver,
  ImagePostResolver,
  UserResolver,
] as const;
