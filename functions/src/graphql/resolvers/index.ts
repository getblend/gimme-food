import { PostsResolver } from "./collections/posts.resolver";
import { UsersResolver } from "./collections/users.resolver";
import { StoresResolver } from "./collections/stores.resoler";
import { MenuItemsResolver } from "./collections/menuItems.resolver";

import { ImagePostResolver } from "./objects/post.resolver";
import { MenuItemResolver } from "./objects/menuItem.resolver";

export const resolvers = [
  PostsResolver,
  ImagePostResolver,
  UsersResolver,
  MenuItemResolver,
  StoresResolver,
  MenuItemsResolver,
] as const;
