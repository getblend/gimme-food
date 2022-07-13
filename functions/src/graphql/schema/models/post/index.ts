import { createUnionType } from "type-graphql";
import PaginatedResponse from "../pagination";
import { ImagePost } from "./imagePost";

const Post = createUnionType({
  name: "Post",
  types: () => [ImagePost] as const,
});

export const PostList = PaginatedResponse("Post", Post);
export type PostList = InstanceType<typeof PostList>;
