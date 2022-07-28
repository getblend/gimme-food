import { Field, ObjectType } from "type-graphql";

import { withObjectTracking } from "../../mixins";
import { Address } from "./address";
import { StoreHours } from "./storeHours";

@ObjectType({
  description: "A details of the Store",
})
export class Store extends withObjectTracking("Store") {
  @Field(() => Address, {
    description: "Address of the store",
  })
  public readonly address: Address;

  @Field(() => [StoreHours], {
    description: "The hours when the store is working",
  })
  public readonly hours: StoreHours[];

  @Field({
    description: "Name of the store",
  })
  public readonly name: string;
}
