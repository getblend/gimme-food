import { GraphQLDateTime, GraphQLHSLA } from "graphql-scalars";
import { Field, Int, ObjectType, ID } from "type-graphql";
import { ObjectTracking } from "../metadata";
import { Tag } from "../tag";
import { User } from "../user";

@ObjectType("GenericPost", {
  description: "A generic post",
  isAbstract: true,
})
export class GenericPost extends ObjectTracking {
  @Field((type) => ID, {
    description: "Unique id for the post",
  })
  public id: string;

  @Field({
    description: "Title of the post",
    nullable: true,
  })
  public title?: string;

  @Field({ description: "Description for the post", nullable: true })
  public description?: string;

  @Field((type) => User, { description: "Creator of the post" })
  public creator: User;

  @Field((type) => [Tag], { description: "Tags the post" })
  public tags: Tag[];

  @Field((type) => GraphQLHSLA, {
    description: "Dominant color in HSLA format",
  })
  public color: string;

  @Field({ description: "Blurhash of the post" })
  public blurHash: string;

  @Field(() => Int, { description: "The total number of likes on the post" })
  public likes: number;
}
