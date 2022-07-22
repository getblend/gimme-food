import { Field, ObjectType } from "type-graphql";
import { withObjectTracking } from "../../mixins";
import { Address } from "./address";
import { StoreHours } from "./store.hours";

@ObjectType({
  description: "A details of the Store",
})
export class Store extends withObjectTracking("Store") {
  
  @Field({
    description: "name of the store",
  })
  public name: string;

  @Field(() => Address, { 
    description: "Address of the store" 
  })
  public address: Address;

  @Field(() => [StoreHours], { 
    description: "Address of the store" 
  })
  public hours: StoreHours[];

  @Field({
    description: "distance of the store",
  })
  public distance: Date;

  @Field({
    description: "deliveryTime of the store",
  })
  public deliveryTime: Date;
}
