import { Resolver } from "type-graphql";
import { PartnerList } from "../schema/models/partner";

@Resolver()
export class PartnerResolver {
  partners(): PartnerList {
    return {
      nodes: [],
      pageInfo: {
        startCursor: undefined,
        endCursor: undefined,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      total: 0,
    };
  }
}
