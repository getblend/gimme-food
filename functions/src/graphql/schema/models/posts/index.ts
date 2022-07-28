import { createUnionType, ObjectType } from "type-graphql";

import { withPagination } from "../../mixins";
import { ImagePost } from "./imagePost";

export const PostType = createUnionType({
  description: "A union of the various supported post types",
  name: "PostType",
  types: () => [ImagePost] as const,
});

@ObjectType({ description: "A collection of posts" })
export class PostCollection extends withPagination(PostType) {}

export { ImagePost };
