import {
  Field,
  GraphQLISODateTime,
  ObjectType,
  registerEnumType,
} from "type-graphql";

import { withObjectTracking } from "../../mixins";
import { Store } from "../stores";
import { User } from "../user";
import { Cart } from "./cart";
import { Tracking } from "./tracking";
import { TransactionType } from "./transaction";

@ObjectType({
  description: "Particulars of the order",
})
export class Order extends withObjectTracking("Order") {
  @Field({
    description: "Timestamp when order was sucessfully delivered",
  })
  public readonly cancellationReason: string;

  @Field(() => GraphQLISODateTime, {
    description: "Timestamp when order was sucessfully delivered",
  })
  public readonly cancelledAt: Date;

  @Field(() => Cart, {
    description: "Store to which the order is placed",
  })
  public readonly cart: Cart;

  @Field(() => GraphQLISODateTime, {
    description: "Timestamp when order was sucessfully delivered",
  })
  public readonly deliveredAt: Date;

  @Field(() => OrderStatus, {
    description: "The status of the order",
  })
  public readonly status: OrderStatus;

  @Field(() => Store, {
    description: "Store to which the order is placed",
  })
  public readonly store: Store;

  @Field(() => Tracking, {
    description: "Tracking status of the order",
  })
  public readonly tracking: Tracking;

  @Field(() => TransactionType, {
    description: "Transation Details of the order",
  })
  public readonly transaction: typeof TransactionType;

  @Field(() => User, {
    description: "The user that placed the order",
  })
  public readonly user: User;
}

export enum OrderStatus {
  Cancelled = "cancelled",
  Delivered = "delivered",
  Delivering = "delivering",
  Pending = "pending",
  PickedUp = "picked_up",
  Placed = "placed",
  ReadyForPickup = "ready_for_pickup",
  Received = "received",
}

registerEnumType(OrderStatus, {
  description: "A enumeration of supported status of an order",
  name: "OrderStatus",
});
