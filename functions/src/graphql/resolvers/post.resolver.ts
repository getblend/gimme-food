import { Args, Query, Resolver } from "type-graphql";
import { PostRepository } from "../repository/post.repository";
import { PageInfoArgs } from "../schema/models/pagination";
import { PostList } from "../schema/models/post";

@Resolver()
export class PostResolver {
  constructor(
    private postsRespository: PostRepository = PostRepository.create()
  ) {}

  @Query((returns) => PostList)
  posts(@Args() currentPage: PageInfoArgs): Promise<PostList> {
    return this.postsRespository.getPosts(currentPage);
  }
}
