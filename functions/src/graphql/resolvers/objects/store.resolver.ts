import { FieldResolver, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";

import { withBoilerplate } from "../../../services/core";

import { MenuItemLoader } from "../../../services/data";
import { MenuItemCollection, Store } from "../../schema";

@Service()
@Resolver(() => Store)
export class StoreResolver extends withBoilerplate("StoreResolver") {
  @Inject()
  private menuItemLoader: MenuItemLoader;

  @FieldResolver(() => MenuItemCollection, {
    description: "A collection of menu items",
    nullable: true,
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public menuItems(@Root() _store: Store): Promise<MenuItemCollection> {
    return this.menuItemLoader.getMenuItems(
      "6f2a6068-7c2e-4e56-b770-13bb227cf1b5"
    );
  }

  protected onInit(): void {
    return;
  }
}
