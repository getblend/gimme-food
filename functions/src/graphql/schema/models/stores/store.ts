import { GraphQLDateTime, GraphQLURL } from "graphql-scalars";
import { Field, Float, ObjectType } from "type-graphql";
import { withObjectTracking } from "../../mixins";
import { Address } from "./address";
import { StoreHours } from "./store.hours";
import { MenuItem } from "../index";
import { Coupon } from "../coupon";

@ObjectType({
  description: "Details of the store. E.g. store name, store address, etc.,",
})
export class Store extends withObjectTracking("Store") {
  @Field({
    description: "Name of the store",
  })
  public name: string;

  @Field(() => Address, {
    description: "Address of the store",
  })
  public address: Address;

  @Field(() => GraphQLURL, {
    description: "URL of the store image",
  })
  public storeImgURL: URL;

  @Field(() => [StoreHours], {
    description:
      "Timings and schedule of the open and close times of the store",
  })
  public hours: StoreHours[];

  @Field(() => Float, {
    description: "Distance of the store from a user trying to access it",
  })
  public distance: number;

  @Field(() => GraphQLDateTime, {
    description: "Approximate time taken to deliver food to a particular user",
  })
  public deliveryTime: string;

  @Field(() => [MenuItem], {
    description: "Collection of items that the store sells",
  })
  public menuItems: MenuItem[];

  @Field(() => [Coupon], {
    description: "Collection of items that the store sells",
  })
  public coupon: Coupon[];
}
