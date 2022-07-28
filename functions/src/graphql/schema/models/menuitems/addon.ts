import { Field, Float, ObjectType } from "type-graphql";

import { withObjectTracking } from "../../mixins";

@ObjectType({
  description: "A topping that can be added onto a menu item",
})
export class AddOn extends withObjectTracking("AddOn") {
  @Field({
    description: "Checks if the add on is available",
  })
  public readonly isInStock: boolean;

  @Field({
    description: "Name of the add on",
  })
  public readonly name: string;

  @Field(() => Float, {
    description: "Price of the add on",
  })
  public readonly price: number;
}
