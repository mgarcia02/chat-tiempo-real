import { create } from "zustand"
import type { Conversation } from "../types/conversationTypes"
import type { User } from "../types/userTypes"
import type { newMessageListenerType } from "../types/socketTypes"

interface GlobalStore {
    conversations: Conversation[] | null
    setConversations: (convs: Conversation[]) => void
    selectedConversation: Conversation | null
    setSelectedConversation: (conv: Conversation) => void
    users: User[] | null
    setUsers: (users: User[]) => void
    addMessage: (message: newMessageListenerType) => void
}

export const useGlobalStore = create<GlobalStore>((set) => ({
    conversations: null,
    setConversations: (convs: Conversation[]) => set({ conversations: convs }),
    selectedConversation: null,
    setSelectedConversation: (conv: Conversation) => set({ selectedConversation: conv }),
    users: null,
    setUsers: (users: User[]) => set({ users }),
    addMessage: (data: newMessageListenerType) => set((state) => {
        const { message, conversationId, participants, isNewConversation } = data

        let conversations = state.conversations ? [...state.conversations] : []

        // Si la conversación no existe, crearla 
        const existing = conversations.find(c => c._id === conversationId)
        let updatedConversation: Conversation

        if (!existing) {
            updatedConversation = {
                _id: conversationId,
                participants: participants,
                messages: [message]
            }
            conversations.push(updatedConversation)
        } else {
            // Si existe, añadir el mensaje 
            updatedConversation = { ...existing, messages: [...existing.messages, message] } 
            
            // Reemplazar la conversación actualizada 
            conversations = conversations.map(c => c._id === conversationId ? updatedConversation : c )
        }

        // Ordenar las conversaciones por la fecha de la ultima actualización
        conversations.sort((a, b) => {
            const lastA = a.messages[a.messages.length - 1]?.createdAt || 0 
            const lastB = b.messages[b.messages.length - 1]?.createdAt || 0 
            return new Date(lastB).getTime() - new Date(lastA).getTime()
        })

        // Actualizar selectedConversation si está abierta 
        let selectedConversation = state.selectedConversation 
        
        // Caso 1: ya existía y coincide el ID
        if (selectedConversation?._id === conversationId) { 
            selectedConversation = { 
                ...selectedConversation, 
                messages: [...selectedConversation.messages, message] 
            } 
        }
        // Caso 2: la conversación es nueva y el usuario está en ese chat 
        else if (!selectedConversation?._id && isNewConversation) { 
            selectedConversation = { 
                _id: conversationId, 
                participants, 
                messages: [message] 
            } 
        }
        
        return {
            conversations,
            selectedConversation
        }
    })
}))