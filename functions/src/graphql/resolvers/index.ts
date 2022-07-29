import { PostsResolver } from "./collections/posts.resolver";
import { UsersResolver } from "./collections/users.resolver";

import { ImagePostResolver } from "./objects/post.resolver";
import { MenuItemResolver } from "./objects/menuItem.resolver";

export const resolvers = [
  PostsResolver,
  ImagePostResolver,
  UsersResolver,
  MenuItemResolver,
] as const;
