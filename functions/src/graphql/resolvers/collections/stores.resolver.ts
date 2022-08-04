import { Inject, Service } from "typedi";
import { Arg, ID, Query, Resolver } from "type-graphql";

import { Store, StoreCollection } from "../../schema";
import { StoreLoader } from "../../../services/data";
import { withBoilerplate } from "../../../services/core";

@Service()
@Resolver()
export class StoresResolver extends withBoilerplate("StoresResolver") {
  @Inject()
  private storeLoader: StoreLoader;

  @Query(() => Store, {
    description: "Returns a single store by id",
    nullable: true,
  })
  public store(
    @Arg("id", () => ID, { description: "The id of a store" }) id: string
  ): Promise<Store> {
    return this.storeLoader.getStore(id);
  }

  @Query(() => StoreCollection, {
    description: "Returns a collection of stores",
    nullable: true,
  })
  public stores(): Promise<StoreCollection> {
    return this.storeLoader.getStores();
  }

  protected onInit(): void {
    return;
  }
}
