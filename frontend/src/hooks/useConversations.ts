// hooks/useConversations.ts
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { getActiveConversationsService, createMessageService } from "../services/conversationService"
import { useGlobalStore } from "../store/useGlobalStore"

export const useConversations = () => {
    const setConversations = useGlobalStore((state) => state.setConversations)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const sendMessage = async (message: string, receiverId: string) => {
        try {
            const { data, error } = await createMessageService(message, receiverId)
            if (error) throw new Error(error)
            console.log(data)
        } catch (e: unknown) {
            toast.error(e instanceof Error ? e.message : "Error desconocido")
        }
    }

    return { loadingConversations: loading, sendMessage }
}
