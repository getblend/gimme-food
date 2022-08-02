import { PostsResolver } from "./collections/posts.resolver";
import { UsersResolver } from "./collections/users.resolver";
import { StoresResolver } from "./collections/stores.resolver";
import { MenuItemsResolver } from "./collections/menuItems.resolver";

import { ImagePostResolver } from "./objects/post.resolver";
import { MenuItemResolver } from "./objects/menuItem.resolver";
import { StoreResolver } from "./objects/store.resolver";

export const resolvers = [
  PostsResolver,
  ImagePostResolver,
  UsersResolver,
  MenuItemResolver,
  StoresResolver,
  MenuItemsResolver,
  StoreResolver,
] as const;
