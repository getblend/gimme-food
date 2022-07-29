import { PostsResolver } from "./collections/posts.resolver";
import { UsersResolver } from "./collections/users.resolver";
import { ImagePostResolver } from "./objects/post.resolver";

export const resolvers = [
  PostsResolver,
  ImagePostResolver,
  UsersResolver,
] as const;
