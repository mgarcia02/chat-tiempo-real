import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const SignUp = () => {
    const { signUp, loading } = useAuthContext()

    const [fullName, setFullName] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [gender, setGender] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await signUp({ fullName, userName, password, confirmPassword, gender })
    }

    return (
        <div className="flex items-center justify-center h-screen bg-[#1D1F2B] text-white">
            <div className="w-full max-w-md p-8 rounded-lg bg-[#252837]">
                <h1 className="mb-6 text-2xl font-bold text-center">Crear cuenta</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Nombre completo</label>
                        <input
                        type="text"
                        className="w-full p-2 bg-[#303346] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6785FF]"
                        placeholder="Tu nombre completo"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
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
                    <div>
                        <label className="block mb-1 text-sm font-medium">Confirmar contraseña</label>
                        <input
                        type="password"
                        className="w-full p-2 bg-[#303346] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6785FF]"
                        placeholder="********"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Género</label>
                        <select
                        className="w-full p-2 bg-[#303346] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6785FF]"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        >
                        <option value="">Selecciona tu género</option>
                        <option value="male">Hombre</option>
                        <option value="female">Mujer</option>
                        </select>
                    </div>
                    <p className="pt-5 text-sm text-center">Si ya tiene una cuenta puede <a href="/signin" className="text-[#6785FF] hover:text-[#6785FF]/80">iniciar sesión</a></p>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 text-white rounded-lg bg-[#6785FF] hover:bg-[#6785FF]/80"
                    >
                        {loading ? "Cargando..." : "Registrarse"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignUp
