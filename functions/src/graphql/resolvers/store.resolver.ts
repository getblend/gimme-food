import { Service, Inject } from "typedi";
import { Args, Query, Resolver } from "type-graphql";
import { Store } from "../schema/models/stores/store";
import { StoreRepository } from "../context";


@Service()
@Resolver()
export class StoreResolver {
  @Inject()
  private storeRepository: StoreRepository;

  @Query(() => Store, {
    description: "Returns a list of posts based on the given pageInfo",
  })
  public stores(): Promise<Store> {
    return this.storeRepository.getStores();
  }
}
