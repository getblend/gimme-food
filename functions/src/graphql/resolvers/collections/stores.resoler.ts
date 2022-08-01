import { Inject, Service } from "typedi";
import { Arg, ID, Query, Resolver } from "type-graphql";

import { Store } from "../../schema";

import { StoreLoader } from "../../../services/data";

@Service()
@Resolver()
export class StoreResolver {
  @Inject()
  private storeLoader: StoreLoader;

  @Query(() => Store, {
    description: "Returns a single store by id",
    nullable: true,
  })
  public store(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Arg("id", () => ID, { description: "The id of a store" }) id: string
  ): Promise<Store> {
    return this.storeLoader.getStore(id);
  }
}
