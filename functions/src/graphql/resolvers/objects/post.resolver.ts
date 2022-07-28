import { FieldResolver, Resolver, Root } from "type-graphql";

import { ImagePost, MenuItem, Store } from "../../schema";

@Resolver(() => ImagePost)
export class ImagePostResolver {
  @FieldResolver(() => MenuItem, {
    description: "The menu item associated with this post",
    nullable: true,
  })
  public menuItem(@Root() post: ImagePost): Promise<MenuItem> {
    throw new Error("Not Implemented");
  }

  @FieldResolver(() => Store, {
    description: "The store associated with this post",
    nullable: true,
  })
  public store(@Root() post: ImagePost): Promise<Store> {
    throw new Error("Not Implemented");
  }
}
