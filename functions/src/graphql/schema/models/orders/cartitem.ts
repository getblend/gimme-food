import { Field, Float, Int, ObjectType } from "type-graphql";
import { withObjectTracking } from "../../mixins";
import { MenuItem, Store } from "../../models";

@ObjectType({
  description: "Information about items in the cart",
})
export class CartItem extends withObjectTracking("CartItem") {
  @Field(() => MenuItem, {
    description: "The dish",
  })
  public menuItem: MenuItem;

  @Field(() => Int, {
    description: "Quantity of the dish",
  })
  public quantity: number;
}
