import { Inject, Service } from "typedi";
import { Arg, Args, ID, Query, Resolver } from "type-graphql";

import { PageInfoArgs, PostCollection, PostType } from "../../schema";
import { PostLoader } from "../../../services/data";
import { withBoilerplate } from "../../../services/core";

@Service()
@Resolver()
export class PostsResolver extends withBoilerplate("PostsResolver") {
  @Inject()
  private postsLoader: PostLoader;

  @Query(() => PostType, {
    description: "Returns a single post by id",
    nullable: true,
  })
  public post(
    @Arg("id", () => ID, { description: "The id of a post" }) id: string
  ): Promise<typeof PostType> {
    return this.postsLoader.getPost(id);
  }

  @Query(() => PostCollection, {
    description: "Returns a list of posts based on the given pageInfo",
  })
  public posts(@Args() currentPage: PageInfoArgs): Promise<PostCollection> {
    return this.postsLoader.getPosts(currentPage);
  }

  protected onInit(): void {
    return;
  }
}
