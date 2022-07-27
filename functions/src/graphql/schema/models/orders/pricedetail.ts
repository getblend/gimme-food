import { Field, Float, Int, ObjectType } from "type-graphql";

@ObjectType({
  description: "Price details of the order",
})
export class PriceDetail {
  @Field(() => Int, {
    description: "Total item cost",
  })
  public foodPrice: number;

  @Field(() => Int, {
    description: "Discount applied on the total item cost",
  })
  public discount: number;

  @Field(() => Int, {
    description: "PackingCharges of the Price",
  })
  public packingCharges: number;

  @Field(() => Int, {
    description: "GST applied on total item cost including packing charges",
  })
  public tax: number;

  @Field(() => Int, {
    description:
      "Delivery charges applied on the order based on pick-up and drop-off locations",
  })
  public deliveryCharges: number;

  @Field(() => Int, {
    description:
      "The final bill amount that includes food price, packing charges, taxes, delivery charges minus discount",
  })
  public finalPrice: number;
}
