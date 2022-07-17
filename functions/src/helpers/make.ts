import { ClassType } from "type-graphql";

export const make = <Type extends ClassType>(
  factory: Type,
  properties: InstanceType<Type>
): InstanceType<Type> => Object.assign(new factory(), properties);
