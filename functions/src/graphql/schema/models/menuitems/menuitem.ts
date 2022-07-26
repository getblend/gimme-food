import { Field, Int, ObjectType } from "type-graphql";
import { withObjectTracking } from "../../mixins";
import { Store } from "../../models"
import { Addon } from "./addon";

@ObjectType({
  description: "A details of the item",
})
export class MenuItem extends withObjectTracking("Item") {
  
  @Field({
    description: "Name of the menuitem",
  })
  public name: string;

  @Field({
    description: "description of the menuitem",
  })
  public description: string;

  @Field(() => Int, {
    description: "Price of the menuitem",
  })
  public price: number;

  @Field(() => Store, { 
    description: "Store of the menuitem" 
  })
  public store: Store;

  @Field({
    description: "Instock of the menuitem",
  })
  public inStock: boolean;

  @Field({
    description: "FoodType of the menuitem",
  })
  public foodType: string;

  @Field(() => [Addon], { description: "Addon of the item" })
  public addon: Addon[];

}
