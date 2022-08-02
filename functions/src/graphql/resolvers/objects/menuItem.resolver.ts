import { FieldResolver, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";

import { MenuItemLoader } from "../../../services/data";
import { MenuItem, MenuItemCategory } from "../../schema";

@Service()
@Resolver(() => MenuItem)
export class MenuItemResolver {
  @Inject()
  private menuItemLoader: MenuItemLoader;

  @FieldResolver(() => MenuItemCategory, {
    description: "The category of this menu item",
    nullable: true,
  })
  public category(@Root() menuItem: MenuItem): Promise<MenuItemCategory> {
    return this.menuItemLoader.loadCategory(menuItem.id);
  }
}
