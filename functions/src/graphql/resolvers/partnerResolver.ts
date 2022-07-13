const partnerList = (parent: any, args: any, context: any, info: any) => {
  return {
    nodes: [],
    pageInfo: {
      startCursor: null,
      endCursor: null,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  };
};

export const partnerResolvers = {
  Query: {
    partnerList,
  },
};
