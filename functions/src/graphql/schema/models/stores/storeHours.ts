import {
  Field,
  ObjectType,
  GraphQLISODateTime,
  registerEnumType,
} from "type-graphql";

import { withObjectTracking } from "../../mixins";

export enum StoreHoursScope {
  Weekdays,
  Weekends,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

registerEnumType(StoreHoursScope, {
  description: "A enumeration of supported store hours scope windows",
  name: "StoreHoursScope",
});

@ObjectType({
  description: "The working hours of a store",
})
export class StoreHours extends withObjectTracking("StoreHours") {
  @Field(() => GraphQLISODateTime, {
    description: "An ISO timestamp of when the store closes",
  })
  public readonly closesAt: Date;

  @Field({
    description: "A description of the store's working hours",
  })
  public readonly description: string;

  @Field(() => GraphQLISODateTime, {
    description: "An ISO timestamp of when the store opens",
  })
  public readonly opensAt: Date;

  @Field(() => StoreHoursScope, {
    description: "Describes how the store's working hours span across days",
  })
  public readonly scope: StoreHoursScope;
}
