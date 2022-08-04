import { AuthenticationError } from "apollo-server-cloud-functions";
import { Arg, Ctx, ID, Query, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";

import { IContext, withBoilerplate } from "../../../services/core";
import { OrderLoader } from "../../../services/data";
import { Order, OrderCollection } from "../../schema";

@Service()
@Resolver()
export class OrdersResolver extends withBoilerplate("OrderResolver") {
  @Inject()
  private orderLoader: OrderLoader;

  @Query(() => Order, {
    description: "Returns a single order by id",
    nullable: true,
  })
  public order(
    @Arg("id", () => ID, { description: "The id of order" }) id: string
  ): Promise<Order> {
    return this.orderLoader.getOrder(id);
  }

  @Query(() => OrderCollection, {
    description: "Returns a list of orders for the current user",
    nullable: true,
  })
  public orders(@Ctx() { auth }: IContext): Promise<OrderCollection> {
    if (!auth?.id) {
      throw new AuthenticationError("Not authenticated");
    }
    return this.orderLoader.getOrders(auth.id);
  }

  protected onInit(): void {
    return;
  }
}
