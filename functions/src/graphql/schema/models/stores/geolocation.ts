import { GraphQLLatitude, GraphQLLongitude } from "graphql-scalars";
import { Field, ObjectType } from "type-graphql";

@ObjectType({
  description: "Geolocation of the store",
})
export class GeoLocation {
  @Field(() => GraphQLLatitude, {
    description: "Latitude of the store",
  })
  public latitude: number;

  @Field(() => GraphQLLongitude, {
    description: "Longitude of the store",
  })
  public longitude: number;

  @Field({
    description: "Google Maps Plus code of the store",
  })
  public plusCode: string;
}
