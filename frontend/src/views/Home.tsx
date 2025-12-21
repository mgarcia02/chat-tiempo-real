
import { useAuthContext } from "../hooks/useAuthContext"
import { useConversations } from "../hooks/useConversations"
import { useUsers } from "../hooks/useUsers"
import Sidebar from "../components/Sidebar"
import ChatWindow from "../components/ChatWindow"

const Home = () => {
    const { authUser } = useAuthContext()
    useConversations()
    useUsers()

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
                <Sidebar />
            </aside>
            <main className="bg-slate-200 flex-[2]">
                <ChatWindow />
            </main>
        </div>
    )
}

export default Home