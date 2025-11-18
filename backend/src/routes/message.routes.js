import express from "express"
import protectRoute from "../middleware/protectRoute.js"
import { getMessages, sendMessage } from "../controllers/message.controller.js"
import validate from "../middleware/validateRequest.js"
import { messageParamsSchema, sendMessageBodySchema } from "../validations/message.schema.js"

const router = express.Router()

router
    .get("/:id", protectRoute, validate({ params: messageParamsSchema }), getMessages)
    .post("/send/:id", protectRoute, validate({ body: sendMessageBodySchema, params: messageParamsSchema }), sendMessage)

export default router