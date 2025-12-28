import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useConversations } from "../hooks/useConversations"
import { useGlobalStore } from "../store/useGlobalStore"
import defaultAvatar from "../assets/images/default-avatar.png"
import sendIcon from "../assets/icons/sendIcon.svg"

const ChatWindow = () => {
    const { authUser: actualUser } = useAuthContext()
    const { sendMessage } = useConversations()
    const conversation = useGlobalStore((state) => state.selectedConversation)
    const receiver = conversation?.participants.find(
        (p) => p._id !== actualUser?._id
    )
    const [input, setInput] = useState("")

    if (!conversation || !receiver) return (
        <div className="flex items-center justify-center h-full">
            <p>Selecciona una conversación</p>
        </div>
    )

    const handleSend = () => { 
        if (!input.trim()) return 
        sendMessage(input, receiver._id) 
        setInput("") 
    }

    return (
        <div className="flex flex-col h-full">
            <header className="flex justify-center p-5 bg-[#252837] rounded-lg items-center gap-5">
                <img
                    src={receiver?.profilePic || defaultAvatar}
                    alt={receiver?.userName}
                    className="object-cover w-10 h-10 rounded-full"
                />
                <h3>{ receiver?.userName }</h3>
            </header>
            
            <section className="flex-1 h-screen p-2 mx-20 my-5 overflow-y-auto">
                <ul className="space-y-5">
                    {conversation?.messages.map((message) => (
                        <li
                        key={message._id}
                        className={`flex ${message.senderId === actualUser?._id ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-md p-2 rounded-lg shadow ${message.senderId === actualUser?._id ? "bg-[#6785FF]" : "bg-[#303346]"}`}
                            >
                                {message.message}
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <footer className="flex gap-5 px-20 pb-8">
                <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    className="w-full p-2 rounded-lg bg-[#252837] focus:outline-none focus:ring-1 focus:ring-[#6785FF]"
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSend()
                    }}
                />
                <button onClick={handleSend} className="bg-[#6785FF] p-2 rounded-lg">
                    <img src={sendIcon} alt="Logo" className="w-auto h-5 cursor-pointer"/>
                </button>
            </footer>
        </div>
    )
}

export default ChatWindow