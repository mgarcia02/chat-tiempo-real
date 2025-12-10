import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { sendMessageRealTime } from "../socket/socket.js"

export const createMessageService = async (message, receiverId, senderId) => {
    let conversation = await Conversation.findOne({
        participants: {$all: [senderId, receiverId]}
    })
    if(!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId]
        })
    }

    // Guarda y crea primero el mensaje
    const newMessage = new Message({
        senderId: senderId,
        receiverId: receiverId,
        message: message
    })
    try {
        await newMessage.save();

        // Actualiza conversación y guarda
        conversation.messages.push(newMessage._id)
        await conversation.save()
    } catch (error) {
        throw mapDBErrors(error);
    }

    // Envia mensaje
    sendMessageRealTime(senderId, receiverId, newMessage)

    return newMessage
}

export const getConversationService = async (userToChatId, senderId) => {
    const conversation = await Conversation.findOne({
        participants: {$all: [senderId, userToChatId]}
    }).populate("messages")
    if(!conversation) return []

    return conversation.messages
}

export const getActiveConversationsService = async (userId) => {
    const conversations = await Conversation.find({
        participants: userId
    }).populate({
        path: "participants",
        select: "_id userName profilePic"
    }).populate("messages")

    return conversations
}