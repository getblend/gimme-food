import { FieldResolver, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";

import { StoreLoader } from "../../../services/data";
import { ImagePost, MenuItem, Store } from "../../schema";

@Service()
@Resolver(() => ImagePost)
export class ImagePostResolver {
  @Inject()
  private storeDb: StoreLoader;

  @FieldResolver(() => MenuItem, {
    description: "The menu item associated with this post",
    nullable: true,
  })
  public menuItem(@Root() post: ImagePost): Promise<MenuItem> {
    return this.storeDb.getMenuItemFromPost(post);
  }

  @FieldResolver(() => Store, {
    description: "The store associated with this post",
    nullable: true,
  })
  public store(@Root() post: ImagePost): Promise<Store> {
    return this.storeDb.getStoreForPost(post);
  }
}
