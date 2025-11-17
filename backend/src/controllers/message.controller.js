import { sendMessageService, getMessagesService } from "../services/message.service.js"

export const sendMessage = async (req, res, next) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        const newMessage = await sendMessageService(message, receiverId, senderId)

        return res.status(201).json({ data: newMessage, message:"Mensage enviado correctamente" })
    } catch (error) {
        next(error)
    }
}

export const getMessages = async (req, res, next) => {
    try {
        const { id:userToChatId } = req.params
        const senderId = req.user._id

        const conversation = await getMessagesService(userToChatId, senderId)

        return res.status(201).json({ data: conversation, message:"Coneversación obtenida correctamente" })
    } catch (error) {
        next(error)
    }
}