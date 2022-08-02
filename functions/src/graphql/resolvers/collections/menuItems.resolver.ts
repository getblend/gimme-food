import { Inject, Service } from "typedi";
import { Arg, ID, Query, Resolver } from "type-graphql";

import { MenuItem } from "../../schema";
import { MenuItemLoader } from "../../../services/data";
import { withBoilerplate } from "../../../services/core";

@Service()
@Resolver()
export class MenuItemsResolver extends withBoilerplate("MenuItemsResolver") {
  @Inject()
  private menuItemLoader: MenuItemLoader;

  @Query(() => MenuItem, {
    description: "Returns a single menuitem by id",
    nullable: true,
  })
  public menuItem(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Arg("id", () => ID, { description: "The id of menuitem" }) id: string
  ): Promise<MenuItem> {
    return this.menuItemLoader.getMenuItem(id);
  }

  protected onInit(): void {
    return;
  }
}
