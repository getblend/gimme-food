import type { ClassType } from "type-graphql";

export const make = <TType extends ClassType>(
  factory: TType,
  properties: InstanceType<TType>
): InstanceType<TType> => Object.assign(new factory(), properties);

export const makeCollection = <TCollection>(items: unknown[]): TCollection => {
  return {
    nodes: items,
    total: items.length,
    count: items.length,
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      endCursor: undefined,
      startCursor: undefined,
    },
  } as unknown as TCollection;
};
