import { PostsResolver } from "./collections/posts.resolver";
import { UsersResolver } from "./collections/users.resolver";
import { StoreResolver } from "./collections/stores.resoler";

import { ImagePostResolver } from "./objects/post.resolver";
import { MenuItemResolver } from "./objects/menuItem.resolver";

export const resolvers = [
  PostsResolver,
  ImagePostResolver,
  UsersResolver,
  MenuItemResolver,
  StoreResolver,
] as const;
