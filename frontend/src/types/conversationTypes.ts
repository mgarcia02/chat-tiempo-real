import type { User } from "./userTypes"

export type Message = {
    _id: string
    senderId: string
    receiverId: string
    message: string
    createdAt: string
    updatedAt: string
}

export type Conversation = {
    _id?: string
    participants: User[]
    messages: Message[]
    createdAt?: string
    updatedAt?: string
}

export type SidebarProps = {
    actualUser: User
    conversations: Conversation[]
    loadingConversations: boolean
    contacts: User[]
    loadingUsers: boolean
    onSelectedConversation: (conv: Conversation) => void
}

export type ChatWindowProps = {
    actualUser: User
    conversation: Conversation | null
}