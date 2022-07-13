import { Field, ID, ObjectType } from "type-graphql";
import { ObjectTracking } from "./metadata";
import PaginatedResponse from "./pagination";

@ObjectType({
  description: "Description of Partner",
})
export class Partner extends ObjectTracking {
  @Field((type) => ID, {
    description: "Unique ObjectId for partner",
  })
  public id: string;

  @Field({
    description: "Unique username for partner",
  })
  public userName: string;

  @Field({
    description: "Unique name for the brand",
  })
  public brandName: string;
}

export const PartnerList = PaginatedResponse("Partner", Partner);
export type PartnerList = InstanceType<typeof PartnerList>;
