import express from "express"
import { signIn, signOut, signUp } from "../controllers/auth.controller.js"

const router = express.Router()

router
    .post("/", signUp)
    .post("/signin", signIn)
    .post("/signout", signOut)

export default router