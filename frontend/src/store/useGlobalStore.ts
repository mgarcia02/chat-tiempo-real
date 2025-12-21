import { create } from "zustand"
import type { Conversation } from "../types/conversationTypes"
import type { User } from "../types/userTypes"

interface GlobalStore {
    conversations: Conversation[] | null
    setConversations: (convs: Conversation[]) => void
    selectedConversation: Conversation | null
    setSelectedConversation: (conv: Conversation) => void
    users: User[] | null
    setUsers: (users: User[]) => void
    //addMessage: (message: Message) => void
}

export const useGlobalStore = create<GlobalStore>((set) => ({
    conversations: null,
    setConversations: (convs: Conversation[]) => set({ conversations: convs }),
    selectedConversation: null,
    setSelectedConversation: (conv: Conversation) => set({ selectedConversation: conv }),
    users: null,
    setUsers: (users: User[]) => set({ users }),
    /*
    addMessage: (message: Message) => set((state) => ({
        // FUTURO: Hacer una copia de la conversación, añadir el mensaje y actualizar la conversations y selectedConversation
    }))
    */
}))