import { createContext, useState } from 'react'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import type { AuthContextType, AuthUser, SignInDTO, SignUpDTO } from '../types/authTypes'
import { signUpService, signInService, signOutService } from '../services/authService'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const getInitialUser = (): AuthUser | null => {
        try {
            const storedUser = localStorage.getItem("user")
            return storedUser ? JSON.parse(storedUser) : null
        } catch {
            localStorage.removeItem("user")
            return null
        }
    }
    const [authUser, setAuthUser] = useState<AuthUser | null>(getInitialUser)

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const signUp = async (obj: SignUpDTO) => {
        try {
            setLoading(true);
            const { data, error } = await signUpService(obj)
            if (error) throw new Error(error)

            localStorage.setItem("user", JSON.stringify(data))
            setAuthUser(data)

            toast.success("¡Bienvenido " + data.userName + "!")
            navigate("/")
        } catch (e: unknown) {
            toast.error(e instanceof Error ? e.message : "Error desconocido")
        } finally {
            setLoading(false)
        }
    }

    const signIn = async (obj: SignInDTO) => {
        try {
            setLoading(true)
            const { data, error } = await signInService(obj)
            if (error) throw new Error(error)

            localStorage.setItem("user", JSON.stringify(data))
            setAuthUser(data)

            toast.success("¡Bienvenido " + data.userName + "!")
            navigate("/")
        } catch (e: unknown) {
            toast.error(e instanceof Error ? e.message : "Error desconocido")
        } finally {
            setLoading(false)
        }
    }

    const signOut = async () => {
        try {
            setLoading(true)
            const error = await signOutService()
            if (error) throw new Error(error)

            localStorage.removeItem("user")
            setAuthUser(null)

            toast.success("Sesión cerrada. ¡Hasta pronto " + authUser?.userName + "!")
            navigate("/signin")
        } catch (e: unknown) {
            toast.error(e instanceof Error ? e.message : "Error desconocido")
        } finally {
            setLoading(false)
        }
    };

    return (
        <AuthContext.Provider value={{ authUser, loading, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider  }