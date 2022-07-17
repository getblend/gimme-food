import { GraphQLURL } from "graphql-scalars";
import { Field, Int, ObjectType } from "type-graphql";
import { BasePost } from "./genericPost";

@ObjectType("ImagePost", {
  description: "An image post",
})
export class ImagePost extends BasePost {
  @Field(() => Int, { description: "The width of the image" })
  width: number;

  @Field(() => Int, { description: "The height of the image" })
  height: number;

  @Field(() => GraphQLURL, {
    description: "The url to the preview of the image post",
  })
  previewUrl: URL;

  @Field(() => GraphQLURL, {
    description: "The url to the full resolution of the image",
  })
  downloadUrl: URL;
}
