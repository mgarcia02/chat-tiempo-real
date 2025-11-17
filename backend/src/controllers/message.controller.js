import { sendMessageService, getMessagesService } from "../services/message.service.js"

export const sendMessage = async (req, res, next) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        await sendMessageService(message, receiverId, senderId, res)
    } catch (error) {
        next(error)
    }
}

export const getMessages = async (req, res, next) => {
    try {
        const { id:userToChatId } = req.params
        const senderId = req.user._id

        await getMessagesService(userToChatId, senderId, res)
    } catch (error) {
        next(error)
    }
}