import { Field, ObjectType } from "type-graphql";

import { withObjectTracking } from "../../mixins";
import { GeoLocation } from "../stores";

@ObjectType({
  description: "Tracking state of the order item",
})
export class Tracking extends withObjectTracking("Tracking") {
  @Field({
    description: "Name of the agent",
  })
  public readonly agentName: string;

  @Field({
    description: "Phone number of the agent",
  })
  public readonly agentPhoneNumber: string;

  @Field({
    description: "Location of the agent",
  })
  public readonly location: GeoLocation;
}
