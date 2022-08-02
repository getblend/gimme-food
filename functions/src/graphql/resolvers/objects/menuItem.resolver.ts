import { FieldResolver, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";

import { withBoilerplate } from "../../../services/core";

import { MenuItemLoader, StoreLoader } from "../../../services/data";
import { MenuItem, MenuItemCategory, Store } from "../../schema";

@Service()
@Resolver(() => MenuItem)
export class MenuItemResolver extends withBoilerplate("MenuItemResolver") {
  @Inject()
  private menuItemLoader: MenuItemLoader;

  @Inject()
  private storeLoader: StoreLoader;

  @FieldResolver(() => MenuItemCategory, {
    description: "The category of this menu item",
    nullable: true,
  })
  public category(@Root() menuItem: MenuItem): Promise<MenuItemCategory> {
    return this.menuItemLoader.loadCategory(menuItem.id);
  }

  @FieldResolver(() => Store, {
    description: "The store associated with this post",
    nullable: true,
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public store(@Root() menuItem: MenuItem): Promise<Store> {
    return this.storeLoader.getStore("e005f05b-6358-40af-b600-bd68df28ffdd");
  }

  protected onInit(): void {
    return;
  }
}
