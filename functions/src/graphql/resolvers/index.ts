import { PostsResolver } from "./collections/posts.resolver";
import { UsersResolver } from "./collections/users.resolver";
import { StoresResolver } from "./collections/stores.resolver";
import { MenuItemsResolver } from "./collections/menuItems.resolver";
import { OrdersResolver } from "./collections/orders.resolver";

import { ImagePostResolver } from "./objects/post.resolver";
import { MenuItemResolver } from "./objects/menuItem.resolver";
import { StoreResolver } from "./objects/store.resolver";
import { OrderResolver } from "./objects/order.resolver";

export const resolvers = [
  PostsResolver,
  ImagePostResolver,
  UsersResolver,
  MenuItemResolver,
  StoresResolver,
  MenuItemsResolver,
  StoreResolver,
  OrdersResolver,
  OrderResolver,
] as const;
