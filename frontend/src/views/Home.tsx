
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
        <div className="flex w-full h-screen bg-[#1D1F2B] text-slate-200">
            <aside className="flex-1 bg-[#252837] m-2 rounded-lg">
                <Sidebar />
            </aside>
            <main className=" flex-[2] m-2">
                <ChatWindow />
            </main>
        </div>
    )
}

export default Home