import Sidebar from "../components/Sidebar"
import ChatWindow from "../components/ChatWindow"

const Home = () => {
    return (
        <div className="flex w-full h-screen">
            <aside className="flex-1 bg-slate-100"><Sidebar /></aside>
            <main className="bg-slate-200 flex-[2]"><ChatWindow /></main>
        </div>
    )
}

export default Home