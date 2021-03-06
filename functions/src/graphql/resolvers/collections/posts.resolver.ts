import { Inject, Service } from "typedi";
import { Arg, Args, ID, Query, Resolver } from "type-graphql";

import { PageInfoArgs, PostCollection, PostType } from "../../schema";
import { PostLoader } from "../../../services/data";

@Service()
@Resolver()
export class PostsResolver {
  @Inject()
  private postsLoader: PostLoader;

  @Query(() => PostType, {
    description: "Returns a single post by id",
    nullable: true,
  })
  public post(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Arg("id", () => ID, { description: "The id of a post" }) id: string
  ): Promise<typeof PostType> {
    return this.postsLoader.getPost(id);
  }

  @Query(() => PostCollection, {
    description: "Returns a list of posts based on the given pageInfo",
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public posts(@Args() currentPage: PageInfoArgs): Promise<PostCollection> {
    return this.postsLoader.getPosts(currentPage);
  }
}
