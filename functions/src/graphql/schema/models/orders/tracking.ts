import { GraphQLLatitude, GraphQLLongitude, GraphQLPhoneNumber } from "graphql-scalars";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType({
  description: "Tracking state of the order item",
})
export class Tracking {

  @Field({
    description: "Name of the runner",
  })
  public runnerName: string;

  @Field(()=>GraphQLPhoneNumber,{
    description: "Phone number of the runner",
  })
  public runnerPhoneNumber: string;

  @Field({
    description: "State that indicates whether the rider on his way pickup or drop off",
  })
  public state: string;

  @Field(() => GraphQLLatitude, {
    description: "Latitude of the runner",
  })
  public latitude: number;

  @Field(() => GraphQLLongitude, {
    description: "Longitude of the runner",
  })
  public longitude: number;

  @Field({
    description:"Timestamp when order was sucessfully delivered",
  })
  public deliveryTimeStamp: Date;
}