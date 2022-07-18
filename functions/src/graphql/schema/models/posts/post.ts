import { GraphQLHSLA } from "graphql-scalars";
import { Field, Int, ObjectType } from "type-graphql";

import { withObjectTracking } from "../../mixins";
import { Tag } from "../tag";
import { User } from "../user";

@ObjectType({ isAbstract: true })
export class Post extends withObjectTracking("Post") {
  @Field({
    description: "Title of the post",
    nullable: true,
  })
  public title?: string;

  @Field({ description: "Description for the post", nullable: true })
  public description?: string;

  @Field(() => User, { description: "Creator of the post" })
  public creator: User;

  @Field(() => [Tag], { description: "Tags the post" })
  public tags: Tag[];

  @Field(() => GraphQLHSLA, {
    description: "Dominant color in HSLA format",
  })
  public color: string;

  @Field({ description: "Blurhash of the post" })
  public blurHash: string;

  @Field(() => Int, { description: "The total number of likes on the post" })
  public likes: number;
}