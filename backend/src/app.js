import express from "express"
import logger from "morgan"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

import connectToMongoDB from "./db/connnectToMongoDB.js"
import { app, server } from "./socket/socket.js"

dotenv.config()

const port = process.env.PORT ?? 3001
const corsOptions = {
    origin: 'http://localhost:3000', // Cambia esto al dominio de tu aplicación React
    optionsSuccessStatus: 200, // Algunas versiones de CORS envían un código 204
    credentials: true, // Habilita el intercambio de cookies y otros datos de autenticación
};

app.use(logger("dev"))
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

server.listen(port, () => {
    connectToMongoDB()
    console.log("INFO: Server running on port", port)
})