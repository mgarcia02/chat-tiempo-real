import axios from "axios"
import type { SignInDTO, SignUpDTO } from "../types/authTypes"

const api = axios.create({
    baseURL: 'http://localhost:3001/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

export const signInService = async(obj: SignInDTO) => {
    try {
        const res = await api.post('/signin', obj)
        return { data: res.data.data, error: null }
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            return { data: null, error: e.response?.data?.message || "Error en la red"}
        }
        return { data: null, error: "Error desconocido"}
    }
}

export const signUpService = async(obj: SignUpDTO) => {
    try {
        const res = await api.post('/', obj)
        return { data: res.data.data, error: null }
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            return { data: null, error: e.response?.data?.message || "Error en la red"}
        }
        return { data: null, error: "Error desconocido"}
    }
}

export const signOutService = async() => {
    try {
        await api.post('/signout')
        return null
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            return e.response?.data?.message || "Error en la red"
        }
        return "Error desconocido"
    }
}