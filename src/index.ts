import express from "express";

const app = express()
const PORT = Number(process.env.PORT) || 8000;
app.get('/', (req, res) => {
    res.json({ message: "Server is running for the graphql" })
})

app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`)
});