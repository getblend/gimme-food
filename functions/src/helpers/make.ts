import type { ClassType } from "type-graphql";

export const make = <TType extends ClassType>(
  factory: TType,
  properties: InstanceType<TType>
): InstanceType<TType> => Object.assign(new factory(), properties);
