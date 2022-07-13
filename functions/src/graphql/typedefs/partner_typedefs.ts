import { gql } from "apollo-server-cloud-functions";

const partnertypeDefs = gql`
  type Partner {
    id: ID!
    userName: String!
    brandName: String!
  }

  type PageInfo {
    startCursor: String
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  type PartnerList {
    pageInfo: PageInfo!
    nodes: [Partner!]
  }

  type Query {
    partnerList: PartnerList
  }
`;

export { partnertypeDefs };
