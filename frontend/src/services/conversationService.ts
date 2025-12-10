import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:3001/api/conversations',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

export const getActiveConversationsService = async() => {
    try {
        const res = await api.get('/')
        return { data: res.data.data, error: null }
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            return { data: null, error: e.response?.data?.message || "Error en la red"}
        }
        return { data: null, error: "Error desconocido"}
    }
}

export const createMessageService = async(message: string, receiverId: string) => {
    try {
        const res = await api.post(`/send/${receiverId}`, { message })
        return { data: res.data.data, error: null }
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            return { data: null, error: e.response?.data?.message || "Error en la red"}
        }
        return { data: null, error: "Error desconocido"}
    }
}