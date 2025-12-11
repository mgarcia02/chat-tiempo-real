import express from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router()

router
    .get("/me", protectRoute, getUser)
    .get("/", protectRoute, getUsers)

export default router