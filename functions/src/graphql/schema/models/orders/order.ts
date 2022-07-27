import { Field, Float, Int, ObjectType } from "type-graphql";
import { withObjectTracking } from "../../mixins";
import { MenuItem, Store } from "../../models";
import { CartItem } from "./cartitem";
import { User } from "../user";
import { PriceDetail } from "./pricedetail";
import { TransactionDetails } from "./transactiondetails";
import { Coupon } from "../coupon";
import { Address } from "../stores/address";
import { Tracking } from "./tracking";

@ObjectType({
  description: "Particulars of the order",
})
export class Order extends withObjectTracking("Order") {
  @Field(() => Store, {
    description: "Store to which the order is placed",
  })
  public store: Store;

  @Field(() => [CartItem], {
    description: "Collection of items added to cart",
  })
  public cartitem: CartItem[];

  @Field(() => User, {
    description: "User that placed the order",
  })
  public user: User;

  @Field(() => PriceDetail, {
    description:
      "Price details of the order. E.g., Total amount, discount, taxes, etc.",
  })
  public priceDetail: PriceDetail;

  @Field(() => Coupon, {
    description: "Coupon applied on the order",
  })
  public coupon: Coupon;

  @Field(() => Address, {
    description: "Address where the order needs to be delivered",
  })
  public deliveryAddress: Address;

  @Field(() => TransactionDetails, {
    description: "Transation Details of the order",
  })
  public transactionDetails: TransactionDetails;

  @Field(() => Tracking, {
    description: "Tracking status of the order",
  })
  public tracking: Tracking;
}
