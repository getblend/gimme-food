import { FieldResolver, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";

import { StoreLoader, MenuItemLoader } from "../../../services/data";
import { ImagePost, MenuItem, Store } from "../../schema";

@Service()
@Resolver(() => ImagePost)
export class ImagePostResolver {
  @Inject()
  private menuItemLoader: MenuItemLoader;

  @Inject()
  private storeLoader: StoreLoader;

  @FieldResolver(() => MenuItem, {
    description: "The menu item associated with this post",
    nullable: true,
  })
  public menuItem(@Root() post: ImagePost): Promise<MenuItem> {
    console.log("post", post);
    // Use the post.id to get a raw post from the database
    // --- since we are using data loader, the post will be cached in memory and we wont have to query the database again
    // Use the post.menuItemId to get the menu item from the menuItemLoader
    // Or use the post.storeId to get the menu items from the store
    return this.menuItemLoader.getMenuItem(
      "6f2a6068-7c2e-4e56-b770-13bb227cf1b5"
    );
  }

  @FieldResolver(() => Store, {
    description: "The store associated with this post",
    nullable: true,
  })
  public store(@Root() post: ImagePost): Promise<Store> {
    return this.storeLoader.getStoreForPost(post);
  }
}
