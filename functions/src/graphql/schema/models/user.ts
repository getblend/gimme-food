import {
  GraphQLEmailAddress,
  GraphQLPhoneNumber,
  GraphQLURL,
} from "graphql-scalars";
import { Field, ObjectType } from "type-graphql";

import { withObjectTracking } from "../mixins";
import { withID } from "../mixins/withId.mixin";

@ObjectType({
  description: "A details of the user",
  isAbstract: true,
})
class UserDetails {
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

@ObjectType({
  description: "A user",
})
export class User extends withID(withObjectTracking(UserDetails)) {}
