import { createMessageService, getConversationService, getActiveConversationsService } from "../services/conversation.service.js"

export const createMessage = async (req, res, next) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        const newMessage = await createMessageService(message, receiverId, senderId)

        return res.status(201).json({ data: newMessage._id, message:"Mensage creado correctamente" })
    } catch (error) {
        next(error)
    }
}

export const getConversation = async (req, res, next) => {
    try {
        const { id:userToChatId } = req.params
        const senderId = req.user._id

        const conversation = await getConversationService(userToChatId, senderId)

        return res.status(201).json({ data: conversation, message:"Coneversación obtenida correctamente" })
    } catch (error) {
        next(error)
    }
}

export const getActiveConversations = async (req, res, next) => {
    try {
        const userId = req.user._id

        const conversations = await getActiveConversationsService(userId)

        return res.status(200).json({ data: conversations, message: "Conversaciones activas obtenidas correctamente"})
    } catch (error) {
        next(error)
    }
}