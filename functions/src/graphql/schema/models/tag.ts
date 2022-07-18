import { Field, ObjectType } from "type-graphql";
import { withObjectTracking } from "../mixins";

@ObjectType({
  description: "A tag",
})
export class Tag extends withObjectTracking("Tag") {
  @Field({
    description: "Title of the tag",
  })
  public title: string;

  @Field({ description: "Description for the tag", nullable: true })
  public description?: string;
}
