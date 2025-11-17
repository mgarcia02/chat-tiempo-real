import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { getReceiverSocketId } from "../socket/socket.js"
import { io } from "../socket/socket.js"

export const sendMessageService = async (message, receiverId, senderId) => {
    let conversation = await Conversation.findOne({
        participants: {$all: [senderId, receiverId]} // La condición $all verifica que todos los elementos del array participants coincidan con los valores de senderId y receiverId.
    })
    if(!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId]
        })
    }

    const newMessage = new Message({
        senderId: senderId,
        receiverId: receiverId,
        message: message
    })
    if(newMessage) {
        conversation.messages.push(newMessage._id)
    }
    
    // await newMessage.save() // run 1st
    // await conversation.save() // run 2nd
    // This will run in parallel 
    await Promise.all([newMessage.save(), conversation.save()])

    // SOCKET IO FUNCIONALITY
    const receiverSocketId = getReceiverSocketId(receiverId)
    if(receiverSocketId) {
        // io.to(<socket_id>).emit() used to send events to specific client
        io.to(receiverSocketId).emit("newMessage", newMessage)
    }

    return newMessage
}

export const getMessagesService = async (userToChatId, senderId) => {
    const conversation = await Conversation.findOne({
        participants: {$all: [senderId, userToChatId]} // La condición $all verifica que todos los elementos del array participants coincidan con los valores de senderId y receiverId.
    }).populate("messages")
    if(!conversation) return []

    return conversation.messages
}