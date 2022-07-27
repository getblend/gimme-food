import { Field, Float, Int, ObjectType } from "type-graphql";


@ObjectType({
    description: "A details of the transationDetails",
})
export class TransationDetails {

    @Field(() => Int, {
        description: "FoodPrice of the Price",
    })
    public foodPrice: number;

    @Field(() => Int, {
        description: "Discount of the Price",
    })
    public discount: number;

    @Field(() => Int, {
        description: "GST of the Price",
    })
    public gst: number;

    @Field(() => Int, {
        description: "PackingCharges of the Price",
    })
    public packingCharges: number;

    @Field(() => Int, {
        description: "DeliveryCharges of the Price",
    })
    public deliveryCharges: number;

    @Field(() => Int, {
        description: "finalPrice of the Price",
    })
    public finalPrice: number;
}