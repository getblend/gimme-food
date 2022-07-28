import { GraphQLHSLA } from "graphql-scalars";
import { Field, Int, ObjectType } from "type-graphql";

import { withObjectTracking } from "../../mixins";
import { Tag } from "../tag";
import { User } from "../user";

@ObjectType({ isAbstract: true })
export abstract class AbstractPost extends withObjectTracking("Post") {
  @Field({ description: "Blurhash of the post" })
  public readonly blurHash: string;

  @Field(() => GraphQLHSLA, {
    description: "Dominant color in HSLA format",
  })
  public readonly color: string;

  @Field(() => User, { description: "Creator of the post" })
  public readonly creator: User;

  @Field({
    description: "Description for the post",
    nullable: true,
  })
  public readonly description?: string;

  @Field(() => Int, { description: "The total number of likes on the post" })
  public readonly likes: number;

  @Field(() => [Tag], { description: "Tags the post" })
  public readonly tags: Tag[];

  @Field({
    description: "Title of the post",
    nullable: true,
  })
  public readonly title?: string;
}
