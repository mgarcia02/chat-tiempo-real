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
    _id: string
    participants: User[]
    messages: Message[]
    createdAt: string
    updatedAt: string
}

export type SidebarProps = {
    conversations: Conversation[]
    loading: boolean
    onSelectedConversation: (conv: Conversation) => void
}

export type ChatWindowProps = {
    conversation: Conversation | null
}