import { FieldResolver, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";

import { withBoilerplate } from "../../../services/core";

import { StoreLoader } from "../../../services/data";
import { MenuItemCollection, Store } from "../../schema";

@Service()
@Resolver(() => Store)
export class StoreResolver extends withBoilerplate("StoreResolver") {
  @Inject()
  private storeLoader: StoreLoader;

  @FieldResolver(() => MenuItemCollection, {
    description: "A collection of menu items",
    nullable: true,
  })
  public menuItems(@Root("id") storeId: string): Promise<MenuItemCollection> {
    return this.storeLoader.getMenuItems(storeId);
  }

  protected onInit(): void {
    return;
  }
}
