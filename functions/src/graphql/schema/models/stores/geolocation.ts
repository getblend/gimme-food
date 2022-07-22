import { Field, ObjectType } from "type-graphql";

@ObjectType({
    description: "A details of the GeoLocation",
})
export class GeoLocation {

    @Field({
        description: "Latitude of the store",
    })
    public latitude: string;

    @Field({
        description: "Longitude of the store",
    })
    public longitude: string;

    @Field({
        description: "PlusCode of the store",
    })
    public plusCode: string;
}