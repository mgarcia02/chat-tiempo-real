const SignUp = () => {

    return (
        <div className="flex items-center justify-center h-screen bg-slate-100">
            <div className="w-full max-w-md p-8 bg-white rounded shadow">
                <h1 className="mb-6 text-2xl font-bold text-center">Crear cuenta</h1>
                <form className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Nombre</label>
                        <input
                        type="text"
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-slate-300"
                        placeholder="Tu nombre"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Email</label>
                        <input
                        type="email"
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-slate-300"
                        placeholder="ejemplo@email.com"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Contraseña</label>
                        <input
                        type="password"
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-slate-300"
                        placeholder="********"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white rounded bg-slate-600 hover:bg-slate-700"
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignUp
