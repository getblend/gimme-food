import { Field, ObjectType } from "type-graphql";
import { GeoLocation } from "./geolocation";

@ObjectType({
    description: "Address associated with the store",
})
export class Address {

    @Field({
        description: "Building number of the store",
    })
    public building: string;

    @Field({
        description: "Landmark near the store",
    })
    public landmark: string;

    @Field({
        description: "Street name or street number of the store",
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
        description: "Postal code of the store",
    })
    public postalCode: string;

    @Field(() => GeoLocation, { 
        description: "Lat and long coordinates of the store" 
      })
      public geoLocation: GeoLocation;
}
