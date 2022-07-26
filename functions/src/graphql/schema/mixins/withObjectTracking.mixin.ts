import { Field, ID, ObjectType } from "type-graphql";

export const withObjectTracking = (tag: string) => {
  @ObjectType({ isAbstract: true })
  abstract class ObjectTracking {
    @Field(() => ID, {
      description: `UniqueID of ${tag}`,
    })
    public id: string;

    @Field({
      description: `Timestamp when the ${tag} was created`,
    })
    public createdAt?: Date;

    @Field({
      description: `Timestamp when the ${tag} was updated`,
    })
    public updatedAt?: Date;
  }

  return ObjectTracking;
};
