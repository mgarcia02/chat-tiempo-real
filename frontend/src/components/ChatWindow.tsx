import type { ChatWindowProps } from "../types/conversationTypes"
import { useAuthContext } from "../hooks/useAuthContext"

const ChatWindow = ({ conversation }: ChatWindowProps) => {
    const {authUser} = useAuthContext()

    return (
        <div className="flex flex-col h-full">
            <header className="flex justify-between p-5 bg-slate-400">
                <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-slate-600"></div>
                    <h3>Chat 1</h3>
                </div>
                <div className="flex gap-2">
                    <button>Buscar</button>
                    <button>Config</button>
                </div>
            </header>
            
            <section className="flex-1 h-screen p-5 overflow-y-auto">
                <ul className="space-y-5">
                    {conversation?.messages.map((message) => (
                        <li
                        key={message._id}
                        className={`flex ${message.senderId === authUser?._id ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-md p-2 rounded shadow ${message.senderId === authUser?._id ? "bg-blue-200" : "bg-white"}`}
                            >
                                {message.message}
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <footer className="flex gap-5 p-3 bg-slate-300">
                <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    className="w-full p-2 border rounded-full border-slate-400"
                />
                <button>Enviar</button>
            </footer>
        </div>
    )
}

export default ChatWindow