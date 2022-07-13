import { Field, ID, ObjectType } from "type-graphql";

import { ObjectTracking } from "./metadata";

@ObjectType({
  description: "A tag",
})
export class Tag extends ObjectTracking {
  @Field((type) => ID, {
    description: "Unique string for the tag",
  })
  public id: string;

  @Field({
    description: "Title of the tag",
  })
  public title: string;

  @Field({ description: "Description for the tag", nullable: true })
  public description?: string;
}
