import { Service } from "typedi";
import { Arg, Args, ID, Query, Resolver } from "type-graphql";

import { PageInfoArgs, PostCollection, PostType } from "../../schema";

@Service()
@Resolver()
export class PostsResolver {
  /**
   * Returns a single post by id
   * @param id The id of the post to get
   * @returns {typeof PostType} The post for the given id
   */
  @Query(() => PostType)
  public post(@Arg("id", () => ID) id: number): Promise<typeof PostType> {
    throw new Error("Not Implemented");
  }

  @Query(() => PostCollection, {
    description: "Returns a list of posts based on the given pageInfo",
  })
  public posts(@Args() currentPage: PageInfoArgs): Promise<PostCollection> {
    throw new Error("Not Implemented");
  }
}
