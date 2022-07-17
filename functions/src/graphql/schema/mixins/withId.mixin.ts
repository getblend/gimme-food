import { ClassType, Field, ID, ObjectType } from "type-graphql";

export function withID<TClassType extends ClassType>(BaseClass: TClassType) {
  @ObjectType({ isAbstract: true })
  class IDData extends BaseClass {
    @Field(() => ID, {
      description: `UniqueID of ${BaseClass.name}`,
    })
    public id: string;
  }
  return IDData;
}
