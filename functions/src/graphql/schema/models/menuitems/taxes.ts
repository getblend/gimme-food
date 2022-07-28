import { Field, Float, ObjectType } from "type-graphql";

import { withObjectTracking } from "../../mixins";

@ObjectType({
  description: "Tax information for a menu item",
})
export class Tax extends withObjectTracking("Tax") {
  @Field({
    description: "Type of Tax. E.g., SGST or CGST",
  })
  public readonly name: string;

  @Field(() => Float, {
    description: "Tax percentage. E.g., 5%, 8%, etc.,",
  })
  public readonly percentage: number;
}
