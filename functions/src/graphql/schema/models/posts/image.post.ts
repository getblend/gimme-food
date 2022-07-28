import { GraphQLURL } from "graphql-scalars";
import { Field, Int, ObjectType } from "type-graphql";

import { AbstractPost } from "./post";

@ObjectType("ImagePost", {
  description: "A post centered around an image",
})
export class ImagePost extends AbstractPost {
  @Field(() => GraphQLURL, {
    description: "The url to the full resolution of the image",
  })
  public readonly downloadUrl: string;

  @Field(() => Int, { description: "The height of the image" })
  public readonly height: number;

  @Field(() => GraphQLURL, {
    description: "The url to the preview of the image post",
  })
  public readonly previewUrl: string;

  @Field(() => Int, { description: "The width of the image" })
  public readonly width: number;
}
