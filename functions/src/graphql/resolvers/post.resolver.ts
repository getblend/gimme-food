import { Service, Inject } from "typedi";
import { Args, Ctx, Query, Resolver } from "type-graphql";

import { PageInfoArgs, PostCollection } from "../schema";
import { PostRepository } from "../context";

@Service()
@Resolver()
export class PostResolver {
  @Inject()
  private postRespository: PostRepository;

  @Query(() => PostCollection, {
    description: "Returns a list of posts based on the given pageInfo",
  })
  public posts(@Args() currentPage: PageInfoArgs): Promise<PostCollection> {
    return this.postRespository.getPosts(currentPage);
  }
}
