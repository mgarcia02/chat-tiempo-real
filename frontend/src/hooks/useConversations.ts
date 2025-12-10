// hooks/useConversations.ts
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { getActiveConversationsService } from "../services/conversationService"
import type { Conversation } from "../types/conversationTypes"

export const useConversations = () => {
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                setLoading(true)

                const { data, error } = await getActiveConversationsService()
                if (error) throw new Error(error)
                
                setConversations(data)
                
            } catch (e: unknown) {
                toast.error(e instanceof Error ? e.message : "Error desconocido")
            } finally {
                setLoading(false)
            }
        }

        fetchConversations()
    }, [])

    return { conversations, loading }
}
