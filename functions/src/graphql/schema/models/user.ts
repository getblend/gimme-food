import {
  GraphQLEmailAddress,
  GraphQLPhoneNumber,
  GraphQLURL,
} from "graphql-scalars";
import { Field, ObjectType } from "type-graphql";

import { withObjectTracking } from "../mixins";

@ObjectType({
  description: "A details of the user",
})
export class User extends withObjectTracking("User") {
  @Field({ description: "About the user", nullable: true })
  public bio?: string;

  @Field(() => GraphQLEmailAddress, {
    description: "EmailAddress of the user",
    nullable: true,
  })
  public email: string;

  @Field({ description: "Firstname of the user" })
  public firstName: string;

  @Field({ description: "Lastname of the user" })
  public lastName: string;

  @Field(() => GraphQLPhoneNumber, {
    description: "PhoneNumber of the user",
    nullable: true,
  })
  public phoneNumber: string;

  @Field(() => GraphQLURL, {
    description: "A url to the profile of the user",
    nullable: true,
  })
  public profileImage: string;

  @Field({
    description: "Unique username for user",
  })
  public userName: string;
}
