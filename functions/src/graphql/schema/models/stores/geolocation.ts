import { Field, ObjectType } from "type-graphql";

@ObjectType({
  description: "A details of the GeoLocation",
})
export class GeoLocation {
  @Field({
    description: "The latitude of the location",
  })
  public readonly latitude: string;

  @Field({
    description: "The longitude of the location",
  })
  public readonly longitude: string;

  @Field({
    description: "The plus code associated with the location",
  })
  public readonly plusCode: string;
}
