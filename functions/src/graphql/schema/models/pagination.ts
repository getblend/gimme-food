import { Field, Int, ObjectType, ClassType, ArgsType } from "type-graphql";

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

@ObjectType("PageInfo", {
  description: "Relay style pageInfo object",
  isAbstract: true,
})
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

export default function PaginatedResponse<TItem>(
  name: string,
  TItemClass: TItem
) {
  @ObjectType(`${name}List`)
  abstract class PaginatedResponseClass {
    // here we use the runtime argument
    @Field((type) => [TItemClass])
    // and here the generic type
    nodes: TItem[];

    @Field((type) => PageInfo)
    // and here the generic type
    pageInfo: PageInfo;

    @Field((type) => Int)
    total: number;
  }

  return PaginatedResponseClass;
}
