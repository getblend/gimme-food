import { FieldResolver, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";

import { withBoilerplate } from "../../../services/core";

import { OrderLoader } from "../../../services/data";
import {
  Cart,
  Order,
  Store,
  Tracking,
  TransactionType,
  User,
} from "../../schema";

@Service()
@Resolver(() => Order)
export class OrderResolver extends withBoilerplate("OrderResolver") {
  @Inject()
  private orderLoader: OrderLoader;

  @FieldResolver(() => Cart, {
    description: "Store to which the order is placed",
  })
  public cart(@Root("id") orderId: string): Promise<Cart> {
    return this.orderLoader.getCart(orderId);
  }

  @FieldResolver(() => Store, {
    description: "Store to which the order is placed",
  })
  public store(): Promise<Store> {
    throw new Error("Not implemented");
  }

  @FieldResolver(() => Tracking, {
    description: "Tracking status of the order",
  })
  public tracking(): Promise<Tracking> {
    throw new Error("Not implemented");
  }

  @FieldResolver(() => TransactionType, {
    description: "Transation Details of the order",
  })
  public transaction(): Promise<typeof TransactionType> {
    throw new Error("Not implemented");
  }

  @FieldResolver(() => User, {
    description: "The user that placed the order",
  })
  public user(): Promise<User> {
    throw new Error("Not implemented");
  }

  protected onInit(): void {
    return;
  }
}
