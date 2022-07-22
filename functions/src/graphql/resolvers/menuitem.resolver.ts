import { Service, Inject } from "typedi";
import { Ctx, Query, Resolver } from "type-graphql";

import { MenuItem } from "../schema";
import { CoreContext, RequestContext, MenuItemRepository } from "../context";

@Service()
@Resolver()
export class MenuItemResolver {
  @Inject()
  private coreContext: CoreContext;

  @Inject()
  private menuItemRepository: MenuItemRepository;

  @Query(() => MenuItem, {
    nullable: true,
    description: "Returns the details of the current authenticated user",
  })
  public menuItem(): Promise<MenuItem | undefined> {
    return this.menuItemRepository.getMenuItem();
  }
}
