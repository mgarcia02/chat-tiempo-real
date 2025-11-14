import { sendMessageService, getMessagesService } from "../services/message.service.js"

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        await sendMessageService(message, receiverId, senderId, res)
    } catch (error) {
        console.log("ERROR (Error in sendMessage controller):", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id:userToChatId } = req.params
        const senderId = req.user._id

        await getMessagesService(userToChatId, senderId, res)
    } catch (error) {
        console.log("ERROR (Error in getMessage controller):", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}