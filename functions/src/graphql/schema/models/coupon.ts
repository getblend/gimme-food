import { Field, Float, Int, ObjectType } from "type-graphql";
import { withObjectTracking } from "../mixins";

@ObjectType({
  description: "Particulars of coupon",
})
export class Coupon extends withObjectTracking("Coupon") {
  @Field({
    description: "Coupon code of the coupon",
  })
  public couponCode: string;

  @Field({
    description: "Description of the coupon",
  })
  public description: string;

  @Field({
    description: "Start date of the coupon availability",
  })
  public promoStart: Date;

  @Field({
    description: "End date for the coupon availability",
  })
  public promoEnd: Date;

  @Field({
    description: "Flag to indicate whether the coupon has expired or not",
  })
  public expired: boolean;

  @Field(() => Int, {
    description: "Discount value of coupon in absolute Rs- either value or percentage will be available",
  })
  public value: number;

  @Field(() => Float, {
    description: "Discount value of coupon in percentage of food price -either value or percentage will be available",
  })
  public percentage: number;

  @Field(() => Int, {
    description: "Maximum value of discount provided when coupon is applied in absolute Rs",
  })
  public maxDiscount: number;

  @Field(() => Int, {
    description: "minimum value in Rs of total items in cart, which enables coupon",
  })
  public minOrderValue: number;
}
