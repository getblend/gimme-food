import { createUnionType, ObjectType } from "type-graphql";
import { withPagination } from "../../mixins";

import { ImagePost } from "./image.post";

export const PostType = createUnionType({
  name: "PostType",
  types: () => [ImagePost] as const,
});

@ObjectType({ description: "A collection of posts" })
export class PostCollection extends withPagination(PostType) {}

export { ImagePost };
