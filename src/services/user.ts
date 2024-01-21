import { createHmac, randomBytes } from "node:crypto"
import JWT from "jsonwebtoken"
import { prismaClient } from "../lib/db"

const JWT_SECRET = "$uperM@n N@eem"

export interface CreateUserPayload {
    firstName: string
    lastName?: string
    email: string
    password: string
}

export interface GetUserToken {
    email: string
    password: string
}

class UserService {
    private static getUserByEmail(email: string) {
        return prismaClient.user.findUnique({ where: { email } })
    }

    private static generateHash(salt: string, password: string) {
        const hashedPassword = createHmac('sha256', salt).update(password).digest('hex')
        return hashedPassword;
    }

    public static createUser(payload: CreateUserPayload) {
        const { firstName, lastName, email, password } = payload

        const salt = randomBytes(32).toString('hex')
        const hashedPassword = UserService.generateHash(salt, password)

        return prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                salt
            }
        })
    }

    public static async getUserToken(payload: GetUserToken) {
        const { email, password } = payload;
        const user = await UserService.getUserByEmail(email);
        if (!user) throw new Error("User not Found");

        const userSalt = user.salt;
        const userHashPassword = UserService.generateHash(userSalt, password);

        if (userHashPassword !== user.password) throw new Error("Incorrect Password");

        // Token Genrate
        const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET)
        return token
    }
}

export default UserService;