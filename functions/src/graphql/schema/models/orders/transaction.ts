import { createUnionType, Field, ID, ObjectType } from "type-graphql";

import { withObjectTracking } from "../../mixins";

@ObjectType({
  description: "A details of a transaction associated with an order",
})
export class RazorPayTransaction extends withObjectTracking(
  "RazorPayTransaction"
) {
  @Field(() => ID, {
    description:
      "OrderId created by Razorpay and is retained whether the payment was successful or not",
  })
  public id: string;

  @Field({
    description:
      "PaymentId created by Razorpay when the payment passed through the gateway is successful",
  })
  public payment: string;

  @Field({
    description:
      "Signature created by Razorpay. This signature is generated once the payment has been made and passed to the frontend, and has to checked against a signature generated on backend by using paymentid, orderid and secretkey",
  })
  public signature: string;
}

export const TransactionType = createUnionType({
  description: "A union of the various supported transaction types",
  name: "TransactionType",
  types: () => [RazorPayTransaction] as const,
});
