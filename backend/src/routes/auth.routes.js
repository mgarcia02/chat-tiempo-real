import express from "express"
import { signIn, signOut, signUp } from "../controllers/auth.controller.js"
import protectRoute from "../middleware/protectRoute.js"


const router = express.Router()

router
    .post("/", signUp)
    .post("/signin", signIn)
    .post("/signout", protectRoute, signOut)

export default router