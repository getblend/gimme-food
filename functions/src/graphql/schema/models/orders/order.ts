import { Field, Float, Int, ObjectType } from "type-graphql";
import { withObjectTracking } from "../../mixins";
import { MenuItem, Store } from "../../models"
import { CartItem } from "./cartitem";
import { User } from "../user";
import { Price } from "./price";
import { TransationDetails } from "./transationdetails";

@ObjectType({
    description: "A details of the order",
})
export class Order extends withObjectTracking("Order") {

    @Field(() => Store, {
        description: "Store of the order"
    })
    public store: Store;

    @Field(() => [CartItem], {
        description: "CartItem of order "
    })
    public cartitem: CartItem[];

    @Field(() => User, {
        description: "User of the order"
    })
    public creator: User;

    @Field(() => User, {
        description: "Price of the order"
    })
    public price: Price;

    @Field(() => User, {
        description: "TransationDetails of the order"
    })
    public transationDetails: TransationDetails;
}