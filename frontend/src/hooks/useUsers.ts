import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { getUsersService } from "../services/userService"
import { useGlobalStore } from "../store/useGlobalStore"

export const useUsers = () => {
    const setUsers = useGlobalStore((state) => state.setUsers)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                setLoading(true)

                const { data, error } = await getUsersService()
                if (error) throw new Error(error)
                
                setUsers(data)                
            } catch (e: unknown) {
                toast.error(e instanceof Error ? e.message : "Error desconocido")
            } finally {
                setLoading(false)
            }
        }
        fetchConversations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { loadingUsers: loading }
}