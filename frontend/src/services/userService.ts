import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:3001/api/users',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

export const getMeService = async() => {
    try {
        const res = await api.get('/me')
        return { data: res.data.data, error: null }
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            return { data: null, error: e.response?.data?.message || "Error en la red"}
        }
        return { data: null, error: "Error desconocido"}
    }
}

export const getUsersService = async() => {
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