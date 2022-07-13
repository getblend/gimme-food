import { Field, ID, ObjectType } from "type-graphql";
import {
  GraphQLEmailAddress,
  GraphQLPhoneNumber,
  GraphQLURL,
} from "graphql-scalars";

import { ObjectTracking } from "./metadata";

@ObjectType({
  description: "A user",
})
export class User extends ObjectTracking {
  @Field((type) => ID, {
    description: "Unique ObjectId for partner",
  })
  public id: string;

  @Field({
    description: "Unique username for user",
  })
  public userName: string;

  @Field({ description: "Firstname of the user" })
  public firstName: string;

  @Field({ description: "Lastname of the user" })
  public lastName: string;

  @Field({ description: "About the user", nullable: true })
  public bio?: string;

  @Field(() => GraphQLURL, {
    description: "A url to the profile of the user",
    nullable: true,
  })
  public profileImage: URL;

  @Field((type) => GraphQLPhoneNumber, {
    description: "PhoneNumber of the user",
    nullable: true,
  })
  public phoneNumber: string;

  @Field((type) => GraphQLEmailAddress, {
    description: "EmailAddress of the user",
    nullable: true,
  })
  public email: string;
}
