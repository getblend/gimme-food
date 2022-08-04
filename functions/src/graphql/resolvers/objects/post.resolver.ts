import { FieldResolver, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";

import { withBoilerplate } from "../../../services/core";

import { MenuItemLoader } from "../../../services/data";
import { ImagePost, MenuItem } from "../../schema";

@Service()
@Resolver(() => ImagePost)
export class ImagePostResolver extends withBoilerplate("ImagePostResolver") {
  @Inject()
  private menuItemLoader: MenuItemLoader;

  @FieldResolver(() => MenuItem, {
    description: "The menu item associated with this post",
    nullable: true,
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public menuItem(@Root() post: ImagePost): Promise<MenuItem> {
    // Use the post.id to get a raw post from the database
    // --- since we are using data loader, the post will be cached in memory and we wont have to query the database again
    // Use the post.menuItemId to get the menu item from the menuItemLoader
    // Or use the post.storeId to get the menu items from the store
    return this.menuItemLoader.getMenuItem(
      "6f2a6068-7c2e-4e56-b770-13bb227cf1b5"
    );
  }

  protected onInit(): void {
    return;
  }
}
