import { Field, ObjectType } from "type-graphql";
import { GraphQLDateTime, GraphQLLocalTime } from "graphql-scalars";
import { withObjectTracking } from "../../mixins";

@ObjectType({
  description: "Schedule and open and close times of the store",
})
export class StoreHours extends withObjectTracking("StoreHours") {
  @Field(() => GraphQLLocalTime, {
    description: "Opening time of the store",
  })
  public openTime: string;

  @Field(() => GraphQLLocalTime, {
    description: "Closing time of the store",
  })
  public closeTime: string;

  @Field({
    description: "Weekday of the store schedule",
  })
  public days: string;

  @Field({
    description: "Explanation for storehours, if any",
  })
  public description: string;

  @Field({
    description: "flag to indicate whether the store is open or not",
  })
  public isOpen: boolean;

}
