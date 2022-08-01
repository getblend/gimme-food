import { FieldResolver, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";

import { MenuItemLoader } from "../../../services/data";
import { MenuItem, Store } from "../../schema";

@Service()
@Resolver(() => Store)
export class ImagePostResolver {
  @Inject()
  private menuItemLoader: MenuItemLoader;

  @FieldResolver(() => MenuItem, {
    description: "The menu items get by storeid",
    nullable: true,
  })
  public menuItem(@Root() store: Store): Promise<MenuItem> {
    return this.menuItemLoader.getMenuItems(
      "6f2a6068-7c2e-4e56-b770-13bb227cf1b5"
    );
  }
}
