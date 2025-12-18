import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { getUsersService } from "../services/userService"
import type { User } from "../types/userTypes"

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([])
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
    }, [])

    return { users, loadingUsers: loading }
}