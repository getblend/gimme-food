import { Field, Float, ObjectType, registerEnumType } from "type-graphql";

import { withObjectTracking, withPagination } from "../../mixins";
import { AddOn } from "./index";
import { MenuItemCategory } from "./category";
import { Tax } from "./taxes";
import { Variation } from "./variation";

export enum DietaryPreference {
  Vegetarian = "vegetarian",
  NonVegetarian = "non-vegetarian",
  Eggetarian = "eggetarian",
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

  @Field(() => [Tax], {
    description: "Taxes applied on the price of the item",
  })
  public readonly taxes: Tax[];

  @Field(() => [Variation], {
    description:
      "Variation of the dish. E.g., a preparation of rice in different styles - Fried rice or boiled rice",
  })
  public variations: Variation[];
}

@ObjectType({ description: "A collection of menu items" })
export class MenuItemCollection extends withPagination(MenuItem) {}
