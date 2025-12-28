import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const SignIn = () => {
    const { signIn, loading } = useAuthContext()

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await signIn({ userName, password })
    }
    
    return (
        <div className="flex items-center justify-center h-screen bg-[#1D1F2B] text-white">
            <div className="w-full max-w-md p-8 bg-[#252837] rounded-lg">
                <h1 className="mb-6 text-2xl font-bold text-center">Iniciar sesión</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Nombre</label>
                        <input
                        type="text"
                        className="w-full p-2 bg-[#303346] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6785FF]"
                        placeholder="Tu nombre"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Contraseña</label>
                        <input
                        type="password"
                        className="w-full p-2 bg-[#303346] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6785FF]"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <p className="pt-5 text-sm text-center">Si no tiene una cuenta puede <a href="/signUp" className="text-[#6785FF] hover:text-[#6785FF]/80">registrarse</a></p>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 text-white rounded-lg bg-[#6785FF] hover:bg-[#6785FF]/80"
                    >
                        {loading ? "Cargando..." : "Iniciar sesión"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignIn
