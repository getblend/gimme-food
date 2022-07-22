import { Field, ObjectType } from "type-graphql";
import { GeoLocation } from "./geolocation";

@ObjectType({
    description: "A details of the Address",
})
export class Address {

    @Field({
        description: "Building of the store",
    })
    public building: string;

    @Field({
        description: "Landmark of the store",
    })
    public landmark: string;

    @Field({
        description: "Street of the store",
    })
    public street: string;

    @Field({
        description: "City of the store",
    })
    public city: string;

    @Field({
        description: "Country of the store",
    })
    public country: string;

    @Field({
        description: "Postalcode of the store",
    })
    public postalCode: string;

    @Field(() => GeoLocation, { 
        description: "Address of the store" 
      })
      public geoLocation: GeoLocation;
}
