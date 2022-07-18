import { Args, Ctx, Query, Resolver } from "type-graphql";

import { Context } from "../context";
import { PageInfoArgs, PostCollection } from "../schema";

@Resolver()
export class PostResolver {
  @Query(() => PostCollection, {
    description: "Returns a list of posts based on the given pageInfo",
  })
  public posts(
    @Args() currentPage: PageInfoArgs,
    @Ctx() ctx: Context
  ): Promise<PostCollection> {
    return ctx.data.post.getPosts(currentPage);
  }
}
