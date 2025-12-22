import { Server } from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin:["http://localhost:5173"],
        methods:["GET", "POST"],
        credentials: true
    }
})

const userSocketMap = {}

export const getSocketId = (id) => {
    return userSocketMap[id]
}

export const sendMessageRealTime = ({ message, conversationId, participants, isNewConversation, senderId, receiverId }) => {
    const receiverSocketId = getSocketId(String(receiverId))
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", { 
            message: message, 
            conversationId: conversationId, 
            participants: participants, 
            isNewConversation: isNewConversation 
        })
    }

    // Confirmación al emisor
    const senderSocketId = getSocketId(String(senderId))
    if (senderSocketId) {
        io.to(senderSocketId).emit("newMessage", { 
            message: message, 
            conversationId: conversationId, 
            participants: participants, 
            isNewConversation: isNewConversation 
        })
        io.to(senderSocketId).emit("messageDelivered", { 
            message: message, 
            conversationId: conversationId
        })
    }
}

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId
    if (userId) { 
        if (!userSocketMap[userId]) {
            userSocketMap[userId] = [] 
            userSocketMap[userId].push(socket.id)
        }
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

export { app, io, server }