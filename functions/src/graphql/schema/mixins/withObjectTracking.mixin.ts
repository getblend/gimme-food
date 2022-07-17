import { ClassType, Field, ObjectType } from "type-graphql";

export function withObjectTracking<TClassType extends ClassType>(
  BaseClass: TClassType
) {
  @ObjectType({ isAbstract: true })
  class ObjectTracking extends BaseClass {
    @Field({
      description: `Timestamp when the ${BaseClass.name} was created`,
    })
    public createdAt: Date;

    @Field({
      description: `Timestamp when the ${BaseClass.name} was updated`,
    })
    public updatedAt: Date;
  }
  return ObjectTracking;
}
