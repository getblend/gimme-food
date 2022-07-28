import { Field, ObjectType } from "type-graphql";

import { GeoLocation } from "./geolocation";

@ObjectType({
  description: "A details of an address",
})
export class Address {
  @Field({
    description: "The building number or name",
  })
  public readonly building: string;

  @Field({
    description: "The city where the address is located",
  })
  public readonly city: string;

  @Field({
    description: "The country where the city is located",
  })
  public readonly country: string;

  @Field(() => GeoLocation, {
    description: "A pointer to the location of the address",
  })
  public readonly geoLocation: GeoLocation;

  @Field({
    description: "A landmark near the address",
    nullable: true,
  })
  public readonly landmark?: string;

  @Field({
    description: "The postal code of the address",
  })
  public readonly postalCode: string;

  @Field({
    description: "The street name of the address",
  })
  public readonly street: string;
}
