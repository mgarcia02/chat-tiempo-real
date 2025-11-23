import { createMessageService, getMessagesService } from "../services/message.service.js"

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