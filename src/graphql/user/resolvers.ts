const queries = {
    hello: () => `Hy, How are you`
};
const mutations = {
    createUser: async (_: any, { }: {}) => {
        return "randomid"
    }
};

export const resolvers = { queries, mutations };