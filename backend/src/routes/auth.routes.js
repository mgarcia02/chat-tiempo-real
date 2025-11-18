import express from "express"
import { signIn, signOut, signUp } from "../controllers/auth.controller.js"
import protectRoute from "../middleware/protectRoute.js"
import validate from "../middleware/validateRequest.js"
import { signInSchema, signUpSchema } from "../validations/auth.schema.js"


const router = express.Router()

router
    .post("/", validate({ body: signUpSchema }), signUp)
    .post("/signin", validate({ body: signInSchema }), signIn)
    .post("/signout", protectRoute, signOut)

export default router