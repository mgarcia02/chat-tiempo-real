import type { User } from "./userTypes"
import type { Message } from "./conversationTypes"

export type SocketContextType = { 
    onlineUsers: string[] 
}

export type newMessageListenerType = { 
    message: Message 
    conversationId: string 
    participants: User[] 
    isNewConversation: boolean
}