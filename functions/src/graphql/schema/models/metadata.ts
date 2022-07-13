import { Field, ID, ObjectType } from "type-graphql";

@ObjectType({ description: "Object time tracking" })
export class ObjectTracking {
  @Field({
    description: "Unique username for partner",
  })
  public createdAt: Date;

  @Field({
    description: "Unique username for partner",
  })
  public updatedAt: Date;
}
