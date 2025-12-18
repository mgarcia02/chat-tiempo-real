import { useState } from "react"
import Sidebar from "../components/Sidebar"
import ChatWindow from "../components/ChatWindow"
import { useAuthContext } from "../hooks/useAuthContext"
import { useConversations } from "../hooks/useConversations"
import { useUsers } from "../hooks/useUsers"
import type { Conversation } from "../types/conversationTypes"

const Home = () => {
    const { authUser } = useAuthContext()
    const { conversations, loadingConversations } = useConversations()
    const { users, loadingUsers } = useUsers()
    const [ selectedConversation, setSelectedConversation ] = useState<Conversation | null>(null)

    // IDs de los usuarios con los que ya tienes conversación
    const activeConversations = new Set(conversations.map((conv) => conv.participants.find((p) => p._id !== authUser?._id)?._id))
    // Filtrar usuarios que no están en conversaciones activas
    const contacts = users.filter(u => !activeConversations.has(u._id))

    if (authUser === null) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Debes iniciar sesión</p>
            </div>
        )
    }
    
    return (
        <div className="flex w-full h-screen">
            <aside className="flex-1 bg-slate-100">
                <Sidebar 
                    actualUser={authUser}
                    conversations={conversations}
                    loadingConversations={loadingConversations}
                    contacts={contacts}
                    loadingUsers={loadingUsers}
                    onSelectedConversation={setSelectedConversation}
                />
            </aside>
            <main className="bg-slate-200 flex-[2]">
                <ChatWindow
                    actualUser={authUser}
                    conversation={selectedConversation}
                />
            </main>
        </div>
    )
}

export default Home