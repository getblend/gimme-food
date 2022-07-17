import { Field, ID, ObjectType } from "type-graphql";
import { withObjectTracking } from "../mixins";
import { withID } from "../mixins/withId.mixin";

@ObjectType({
  isAbstract: true,
})
class TagDetails {
  @Field({
    description: "Title of the tag",
  })
  public title: string;

  @Field({ description: "Description for the tag", nullable: true })
  public description?: string;
}

@ObjectType({
  description: "A tag",
})
export class Tag extends withID(withObjectTracking(TagDetails)) {}
