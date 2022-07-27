import {
  GraphQLEmailAddress,
  GraphQLPhoneNumber,
  GraphQLURL,
} from "graphql-scalars";
import { Field, ObjectType } from "type-graphql";

import { withObjectTracking } from "../mixins";

@ObjectType({
  description: "User Details",
})
export class User extends withObjectTracking("User") {
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

  @Field(() => GraphQLPhoneNumber, {
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
