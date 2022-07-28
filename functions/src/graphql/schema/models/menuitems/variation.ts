import { Field, Float, ObjectType } from "type-graphql";

import { withObjectTracking } from "../../mixins";

@ObjectType({
  description:
    "Variation of a dish. E.g., a preparation of rice in different styles - Fried rice or boiled rice",
})
export class Variation extends withObjectTracking("Variation") {
  @Field({
    description: "Indicates whether this variation is available for the item",
  })
  public readonly isInStock: boolean;

  @Field({
    description: "Name of the variation",
  })
  public readonly name: string;

  @Field(() => Float, {
    description: "Packaging charges for the variation",
  })
  public readonly packingCharges: number;

  @Field(() => Float, {
    description: "Price of the variation",
  })
  public readonly price: number;

  @Field({
    description:
      "Title of of the variation to be displayed, eg. Types of rice, styles of rice",
  })
  public readonly title: string;
}
