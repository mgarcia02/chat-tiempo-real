const Sidebar = () => {
    return (
        <div className="flex flex-col gap-5">
            <header className="flex justify-between p-5 bg-slate-400">
                <div className="w-10 h-10 rounded-full bg-slate-600"></div>
                <div className="flex gap-2">
                    <button>Config</button>
                    <button>Sign Out</button>
                </div>
            </header>

            <section className="flex flex-col gap-5 px-5">
                <h2>Chats activos</h2>
                <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-slate-600"></div>
                    <div>
                        <h3>Chat 1</h3>
                        <p className="text-sm text-gray-400">Ultimo mensaje</p>
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-slate-600"></div>
                    <div>
                        <h3>Chat 2</h3>
                        <p className="text-sm text-gray-400">Hola buenas tades...</p>
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-slate-600"></div>
                    <div>
                        <h3>Chat 3</h3>
                        <p className="text-sm text-gray-400">JAJAJAJAJA</p>
                    </div>
                </div>
            </section>

            <section className="flex flex-col gap-5 px-5">
                <h2>Contactos</h2>
                <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-slate-600"></div>
                    <h3>Chat 3</h3>
                </div>
                <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-slate-600"></div>
                    <h3>Chat 3</h3>
                </div>
                <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-slate-600"></div>
                    <h3>Chat 3</h3>
                </div>
            </section>
        </div>
    )
}

export default Sidebar