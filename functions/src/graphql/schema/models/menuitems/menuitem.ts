import { Field, Int, ObjectType } from "type-graphql";
import { dietaryPreference, withObjectTracking } from "../../mixins";
import { Store } from "../../models"
import { AddOn } from "./addon";
import { Taxes } from "./taxes";
import { Variation } from "./variation";

@ObjectType({
  description: "Details and customizations of the dish",
})
export class MenuItem extends withObjectTracking("MenuItem") {
  
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
    description: "Store that contains the dish" 
  })
  public store: Store;

  @Field(()=>Int,{
    description: "Packing charges associated with the particular dish",
  })
  public packingCharges: number;   

  @Field({
    description: "Flag to indicate whether dish is in stock",
  })
  public inStock: boolean;

  @Field({
    description: "Dietary preference of the dish. E.g., veg/non-veg,gluten, etc.",
  })
  public dietaryPreference:dietaryPreference

  @Field(() => [AddOn], { description: "Add-ons for the dish. E.g., toppings for a pizza - extra cheese, extra chicken, etc." })
  public addOn: AddOn[];

  @Field(() => Variation, { description: "Variation of the dish. E.g., a preparation of rice in different styles - Fried rice or boiled rice" })
  public variation: Variation;

  @Field(() => [Taxes], { description: "Taxes applied on the price of the dish" })
  public tax: Taxes[];

}


