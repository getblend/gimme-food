import { Field, Float, ObjectType, registerEnumType } from "type-graphql";

import { withObjectTracking } from "../../mixins";
import { Store } from "../stores/store";
import { AddOn } from "./addOn";

export enum DietaryPreference {
  Vegetarian = "veg",
  NonVegetarian = "nonveg",
}

registerEnumType(DietaryPreference, {
  description: "A enumeration of supported dietary preferences",
  name: "DietaryPreference",
});

@ObjectType({
  description: "An item on the menu available in a store",
})
export class MenuItem extends withObjectTracking("MenuItem") {
  @Field(() => [AddOn], { description: "Add ons available for this menu item" })
  public readonly addons: AddOn[];

  @Field({
    description: "Description of the menu item",
  })
  public readonly description: string;

  @Field(() => [DietaryPreference], {
    description: "Suppported dietary preference of the menu item",
  })
  public readonly dietaryPreferences: DietaryPreference[];

  @Field({
    description: "Describes whether this menu item is available or not",
  })
  public readonly isInStock: boolean;

  @Field({
    description: "Name of the menu item",
  })
  public readonly name: string;

  @Field(() => Float, {
    description: "Price of the menu item",
  })
  public readonly price: number;

  @Field(() => Store, {
    description: "The store that this menu item belongs to",
  })
  public readonly store: Store;
}
