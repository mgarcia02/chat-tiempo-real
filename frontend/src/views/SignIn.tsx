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
        <div className="flex items-center justify-center h-screen bg-slate-100">
            <div className="w-full max-w-md p-8 bg-white rounded shadow">
                <h1 className="mb-6 text-2xl font-bold text-center">Iniciar sesión</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Nombre</label>
                        <input
                        type="text"
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-slate-300"
                        placeholder="Tu nombre"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Contraseña</label>
                        <input
                        type="password"
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-slate-300"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 text-white rounded bg-slate-600 hover:bg-slate-700"
                    >
                        {loading ? "Cargando..." : "Iniciar sesión"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignIn
