import express from "express"
import protectRoute from "../middleware/protectRoute.js"
import { createMessage, getConversation, getActiveConversations } from "../controllers/conversation.controller.js"
import validate from "../middleware/validateRequest.js"
import { conversationParamsSchema, sendMessageBodySchema } from "../validations/conversation.schema.js"

const router = express.Router()

router
    .get("/", protectRoute, getActiveConversations)
    .get("/:id", protectRoute, validate({ params: conversationParamsSchema }), getConversation)
    .post("/send/:id", protectRoute, validate({ body: sendMessageBodySchema, params: conversationParamsSchema }), createMessage)

export default router