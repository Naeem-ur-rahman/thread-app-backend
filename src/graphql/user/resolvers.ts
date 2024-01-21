import UserService, { CreateUserPayload } from "../../services/user";

const queries = {
    hello: () => `Hy, How are you`
};
const mutations = {
    createUser: async (_: any, payload: CreateUserPayload) => {
        const res = await UserService.createUser(payload);
        return res.id;
    },
};

export const resolvers = { queries, mutations };