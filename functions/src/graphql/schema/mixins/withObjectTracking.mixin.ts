import { Field, ID, ObjectType, GraphQLISODateTime } from "type-graphql";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export const withObjectTracking = (tag: string) => {
  @ObjectType({ isAbstract: true })
  abstract class ObjectTracking {
    @Field(() => GraphQLISODateTime, {
      description: `Timestamp when the ${tag} was created`,
    })
    public readonly createdAt?: string;

    @Field(() => ID, {
      description: `UniqueID of ${tag}`,
    })
    public readonly id: string;

    @Field(() => GraphQLISODateTime, {
      description: `Timestamp when the ${tag} was updated`,
    })
    public readonly updatedAt?: string;
  }

  return ObjectTracking;
};
