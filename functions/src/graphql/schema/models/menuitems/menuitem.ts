import { Field, Int, ObjectType } from "type-graphql";
import { withObjectTracking } from "../../mixins";
import { Store } from "../../models"
import { Addon } from "./addon";
import { Taxes } from "./taxes";
import { Variation } from "./variation";

@ObjectType({
  description: "A details of the item",
})
export class MenuItem extends withObjectTracking("Item") {
  
  @Field({
    description: "Name of the dish",
  })
  public name: string;

  @Field({
    description: "Description of the dish",
  })
  public description: string;

  @Field(() => Int, {
    description: "Price of the dish",
  })
  public price: number;

  @Field(() => Store, { 
    description: "Store that contains dish" 
  })
  public store: Store;

  @Field({
    description: "InStock of the menuitem",
  })
  public inStock: boolean;

  @Field({
    description: "DietaryPreference value of the dish",
  })
  public dietaryPreference: string;

  @Field(() => [Addon], { description: "Addons for the dish" })
  public addon: Addon[];

  @Field(() => Variation, { description: "Variation for the dish" })
  public variation: Variation;

  @Field(() => [Taxes], { description: "Taxes for the dish" })
  public tax: Taxes[];

}
