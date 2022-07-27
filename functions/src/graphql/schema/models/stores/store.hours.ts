import { Field, ObjectType } from "type-graphql";
import { GraphQLDateTime } from "graphql-scalars";
import { withObjectTracking } from "../../mixins";

@ObjectType({
    description: "A details of the StoreHours",
})
export class StoreHours extends withObjectTracking("StoreHours"){

    @Field(()=>GraphQLDateTime,{
        description: "Open time of the store",
    })
    public open: string;

    @Field(()=>GraphQLDateTime,{
        description: "End time of the store",
    })
    public close:string;

    @Field({
        description: "Days of the store",
    })
    public days: string;

    @Field({
        description: "description of the storehours",
    })
    public description: string;
}