import UserService, { CreateUserPayload } from "../../services/user";

const queries = {
    getUserToken: (_: any, payload: { email: string, password: string }) => {
        const token = UserService.getUserToken({
            email: payload.email,
            password: payload.password
        })
        return token;
    },
    getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
        if (context && context.user) {
            const id = context.user.id;
            const User = await UserService.findUserById(id);
            return User;
        }
    },
};
const mutations = {
    createUser: async (_: any, payload: CreateUserPayload) => {
        const res = await UserService.createUser(payload);
        return res.id;
    },
};

export const resolvers = { queries, mutations };