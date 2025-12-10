import { useState } from "react"
import Sidebar from "../components/Sidebar"
import ChatWindow from "../components/ChatWindow"
import { useConversations } from "../hooks/useConversations"
import type { Conversation } from "../types/conversationTypes"

const Home = () => {
    const { conversations, loading } = useConversations()
    const [ selectedConversation, setSelectedConversation ] = useState<Conversation | null>(null)

    return (
        <div className="flex w-full h-screen">
            <aside className="flex-1 bg-slate-100">
                <Sidebar 
                    conversations={conversations}
                    loading={loading}
                    onSelectedConversation={setSelectedConversation}
                />
            </aside>
            <main className="bg-slate-200 flex-[2]">
                <ChatWindow
                    conversation={selectedConversation}
                />
            </main>
        </div>
    )
}

export default Home