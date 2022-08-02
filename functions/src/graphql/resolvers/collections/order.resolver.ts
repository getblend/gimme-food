import { Inject, Service } from "typedi";
import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";

import { Order } from "../../schema";
import { OrderLoader } from "../../../services/data";
import { withBoilerplate } from "../../../services/core";

@Service()
@Resolver()
export class OrderResolver extends withBoilerplate("OrderResolver") {
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

  protected onInit(): void {
    return;
  }
}
