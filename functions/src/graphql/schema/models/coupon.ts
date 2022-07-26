import { Field, Float, Int, ObjectType } from "type-graphql";
import { withObjectTracking } from "../mixins";


@ObjectType({
  description: "A details of the coupon",
})
export class Coupon extends withObjectTracking("Coupon") {
  
  @Field({
    description: "Code of the coupon",
  })
  public code: string;

  @Field({
    description: "Description of the coupon",
  })
  public description: string;

  @Field( {
    description: "PromoStart of the coupon",
  })
  public promoStart: Date;

  @Field({
    description: "promoEnd of the coupon",
  })
  public promoEnd: Date;

  @Field({
    description: "Expired of the coupon",
  })
  public expired: boolean;

  @Field(() => Int,{
    description: "Value of the coupon",
  })
  public value: number;

  @Field(()=>Float,{
    description: "Percentage of the coupon",
  })
  public percentage: number;

  @Field(() => Int,{
    description: "MaxDiscount of the coupon",
  })
  public maxDiscount: number;

  @Field(() => Int,{
    description: "MinDiscount of the coupon",
  })
  public minDiscount: number;
}
