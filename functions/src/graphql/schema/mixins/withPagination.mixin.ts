import { ArgsType, Field, Int, ObjectType } from "type-graphql";

import type { ClassType } from "type-graphql";

@ArgsType()
export class PageInfoArgs {
  @Field({
    description: "The cursor after which to load the data from",
    nullable: true,
  })
  public readonly after?: string;

  @Field({
    description: "The cursor before which to load the data from",
    nullable: true,
  })
  public readonly before?: string;

  @Field(() => Int, {
    description: "The number of items to load after the cursor",
    nullable: true,
  })
  public readonly first?: number;

  @Field(() => Int, {
    description: "The number of items to load before the cursor",
    nullable: true,
  })
  public readonly last?: number;
}

@ObjectType({
  description: "The pagination cursor information for a page",
})
export class PageInfo {
  @Field({
    description: "The cursor that returns the next page of results",
    nullable: true,
  })
  public readonly endCursor?: string;

  @Field({
    description: "Indicates if there are more items after the cursor",
  })
  public readonly hasNextPage: boolean;

  @Field({
    description: "Indicates if there are more items before the cursor",
  })
  public readonly hasPreviousPage: boolean;

  @Field({
    description: "The cursor that returns the previous page of results",
    nullable: true,
  })
  public readonly startCursor?: string;
}

/**
 * Extends a class to add support for pagination.
 * @param BaseClass The class to extend
 * @returns The base class with the additional properties
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export function withPagination<TClass>(BaseClass: TClass) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponse {
    @Field(() => Int, {
      description: "The number of items returned in the current page",
    })
    public readonly count: number;

    // @Field(() => ID, {
    //   description: "A cursor pointing to the information on this page",
    //   nullable: true,
    // })
    // public readonly id: string;

    // here we use the runtime argument
    @Field(() => [BaseClass], {
      description: `A list of ${
        (BaseClass as unknown as ClassType).name
      } items`,
    })
    // and here the generic type
    public readonly nodes: TClass[];

    @Field(() => PageInfo, {
      description:
        "Details on how to get the next or previous items in the collection",
    })
    // and here the generic type
    public readonly pageInfo: PageInfo;

    @Field(() => Int, {
      description: "The total number of items in the collection",
    })
    public readonly total: number;
  }

  return PaginatedResponse;
}
