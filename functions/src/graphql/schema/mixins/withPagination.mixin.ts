import { ArgsType, ClassType, Field, Int, ObjectType } from "type-graphql";

@ArgsType()
export class PageInfoArgs {
  @Field({ nullable: true })
  before?: string;

  @Field({ nullable: true })
  after?: string;

  @Field(() => Int, { nullable: true })
  first?: number;

  @Field(() => Int, { nullable: true })
  last?: number;
}

@ObjectType({ isAbstract: true })
export class PageInfo {
  @Field({
    description: "field for startCursor",
    nullable: true,
  })
  public startCursor?: string;

  @Field({
    description: "field for endCursor",
    nullable: true,
  })
  public endCursor?: string;

  @Field({
    description: "field for hasNextPage",
  })
  public hasNextPage: boolean;

  @Field({
    description: "field for hasPreviousPage",
  })
  public hasPreviousPage: boolean;
}

export function withPagination<TClassType>(BaseClass: TClassType) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponse {
    // here we use the runtime argument
    @Field(() => [BaseClass])
    // and here the generic type
    nodes: TClassType[];

    @Field(() => PageInfo)
    // and here the generic type
    pageInfo: PageInfo;

    @Field(() => Int)
    total: number;
  }

  return PaginatedResponse;
}
