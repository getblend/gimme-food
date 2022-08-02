import { Field, Float, Int, ObjectType } from "type-graphql";

import { withObjectTracking } from "../../mixins";
import { MenuItem } from "../index";
import { Address, Store } from "../stores";
import { User } from "../user";

@ObjectType({
  description: "Information about the cart",
})
export class Cart extends withObjectTracking("Cart") {
  @Field(() => Float, {
    description: "Indicates if the cart abandoned",
  })
  public readonly isAbandoned: number;

  @Field(() => [MenuItem], {
    description: "The menu item in the cart",
  })
  public readonly items: MenuItem[];

  @Field(() => Float, {
    description: "The cost of packing the items",
  })
  public readonly packingTotal: number;

  @Field(() => Address, {
    description: "Address where the order needs to be delivered",
  })
  public readonly shippingAddress: Address;

  @Field(() => Float, {
    description: "The cost of the shipping",
  })
  public readonly shippingTotal: number;

  @Field(() => Store, {
    description: "The store associated with the cart",
  })
  public readonly store: Store;

  @Field(() => Float, {
    description: "The cost of the cart before taxes and discounts",
  })
  public readonly subTotal: number;

  @Field(() => Float, {
    description: "The grand total of the cart",
  })
  public readonly total: number;

  @Field(() => Float, {
    description: "The total discount amount",
  })
  public readonly totalDiscount: number;

  @Field(() => Int, {
    description: "The total number items in the cart",
  })
  public readonly totalItems: number;

  @Field(() => Float, {
    description: "The cost of all the taxes",
  })
  public readonly totalTax: number;

  @Field(() => Int, {
    description: "The total number of unique items in the cart",
  })
  public readonly totalUniqueItems: number;

  @Field(() => User, {
    description: "The user that placed the order",
  })
  public readonly user: User;
}
