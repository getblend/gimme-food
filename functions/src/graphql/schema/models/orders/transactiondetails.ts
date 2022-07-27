import { Field, ObjectType } from "type-graphql";

@ObjectType({
  description: "A details of the transationDetails",
})
export class TransactionDetails {
  @Field({
    description:
      "Order id created by Razorpay. Order id is created when the API is called and retained whether the payment was successful or not",
  })
  public razorpayOrderId: string;

  @Field({
    description:
      "Payment id created by Razorpay. Payment id is created if the payment passed through the PG is successful",
  })
  public razorpayPaymentId: String;

  @Field({
    description:
      "Signature created by Razorpay. This signature is generated once the payment has been made and passed to the frontend, and has to checked against a signature generated on backend by using paymentid, orderid and secretkey",
  })
  public razorpaySignature: string;

  @Field({
    description: "Payment mode of the transaction",
  })
  public paymentMode: string;
}
