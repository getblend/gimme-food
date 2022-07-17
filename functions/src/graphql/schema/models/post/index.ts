import { createUnionType, ObjectType } from "type-graphql";
import { withPagination } from "../../mixins";

import { ImagePost } from "./imagePost";

export const Post = createUnionType({
  name: "Post",
  types: () => [ImagePost] as const,
});

@ObjectType({ description: "A collection of posts" })
export class PostCollection extends withPagination(Post) {}

export { ImagePost };
