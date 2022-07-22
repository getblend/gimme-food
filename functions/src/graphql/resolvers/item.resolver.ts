import { Service, Inject } from "typedi";
import { Ctx, Query, Resolver } from "type-graphql";

import { Item } from "../schema";
import { CoreContext, RequestContext, ItemRepository } from "../context";

@Service()
@Resolver()
export class ItemResolver {
  @Inject()
  private coreContext: CoreContext;

  @Inject()
  private itemRepository: ItemRepository;

  @Query(() => Item, {
    nullable: true,
    description: "Returns the details of the current authenticated user",
  })
  public item(): Promise<Item | undefined> {
    return this.itemRepository.getItem();
  }
}
