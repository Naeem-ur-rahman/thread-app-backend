import express from "express";
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"

async function init() {
    const app = express()
    const PORT = Number(process.env.PORT) || 8000;
    app.use(express.json())

    // Create a gqlServer
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query{
                hello: String
                say(name: String!): String
            }
        `,
        resolvers: {
            Query: {
                hello: () => `Hey there, I am a graphql server`,
                say: (_,{name})=> `Hey ${name}, How you doinnggg....`
            },
        },
    });

    // Start the gqlServer
    await gqlServer.start();

    app.get('/', (req, res) => {
        res.json({ message: "Server is running for the graphql" })
    })

    app.use("/graphql", expressMiddleware(gqlServer));

    app.listen(PORT, () => {
        console.log(`Server Started at http://localhost:${PORT}`)
    });
}

init();