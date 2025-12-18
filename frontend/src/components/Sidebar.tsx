import SignOutButton from "./SignOutButton"
import type { SidebarProps } from "../types/conversationTypes"

const Sidebar = ({ actualUser, conversations, loadingConversations, contacts, loadingUsers, onSelectedConversation }: SidebarProps) => {

    return (
        <div className="flex flex-col gap-5">
            <header className="flex justify-between p-5 border-r-2 bg-slate-400">
                <div className="w-10 h-10 rounded-full bg-slate-600"></div>
                <div className="flex gap-2">
                    <button>Config</button>
                    <SignOutButton />
                </div>
            </header>

            <section className="flex flex-col gap-5 px-5">
                <h2>Chats activos</h2>
                {loadingConversations && <p>Loading...</p>}
                {conversations.map((conv) => {
                    const receiver = conv.participants.find(
                        (p) => p._id !== actualUser?._id
                    )

                    return (
                        <div
                            key={conv._id}
                            className="flex items-center gap-5"
                            onClick={() => onSelectedConversation(conv)}
                        >
                            <div className="w-10 h-10 rounded-full bg-slate-600"></div>
                            <div>
                                <h3>{receiver?.userName}</h3>
                                <p className="text-xs text-gray-400">{conv.messages[conv.messages.length - 1].message}</p>
                            </div>
                        </div>
                    )
                })}
            </section>

            <section className="flex flex-col gap-5 px-5">
                <h2>Contactos</h2>
                {loadingUsers && <p>Loading...</p>}
                {contacts.map((contact) => (
                    <div 
                        key={contact._id} 
                        className="flex items-center gap-5"
                        onClick={() => onSelectedConversation({
                            participants: [contact, actualUser],
                            messages: []
                        })}
                    >
                        <div className="w-10 h-10 rounded-full bg-slate-600"></div>
                        <h3>{contact.userName}</h3>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default Sidebar