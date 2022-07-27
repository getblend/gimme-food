import { Field, Float, Int, ObjectType } from "type-graphql";
import { withObjectTracking } from "../../mixins";
import { MenuItem, Store } from "../../models"


@ObjectType({
  description: "A details of the cartItem",
})
export class CartItem extends withObjectTracking("CartItem") {

  @Field(() => MenuItem, { 
    description: "MenuItem of the dish" 
  })
  public menuItem: MenuItem;

  @Field(()=>Int,{ 
    description: "quentity of the dish" 
  })
  public quentity: number;
}