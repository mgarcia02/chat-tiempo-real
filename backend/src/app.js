import express from "express"
import logger from "morgan"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

import authRoutes from "./routes/auth.routes.js"
import conversationRoutes from "./routes/conversation.routes.js"
import userRoutes from "./routes/user.routes.js"

import errorHandler from "./middleware/errorHandler.js"

import connectToMongoDB from "./db/connnectToMongoDB.js"
import { app, server } from "./socket/socket.js"

dotenv.config()

const port = process.env.PORT ?? 3001
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials: true,
};

app.use(logger("dev"))
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())

// Rutas principales de la API
app.use("/api/auth", authRoutes)
app.use("/api/conversations", conversationRoutes)
app.use("/api/users", userRoutes)

// Middleware global de manejo de errores
app.use(errorHandler)

server.listen(port, () => {
    connectToMongoDB()
    console.log("INFO: Server running on port", port)
})