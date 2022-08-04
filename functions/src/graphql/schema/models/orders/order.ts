import {
  Field,
  GraphQLISODateTime,
  ObjectType,
  registerEnumType,
} from "type-graphql";

import { withObjectTracking, withPagination } from "../../mixins";

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

  @Field(() => GraphQLISODateTime, {
    description: "Timestamp when order was sucessfully delivered",
  })
  public readonly deliveredAt: Date;

  @Field(() => OrderStatus, {
    description: "The status of the order",
  })
  public readonly status: OrderStatus;
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

@ObjectType({ description: "A collection of menu items" })
export class OrderCollection extends withPagination(Order) {}
