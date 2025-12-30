import { useAuthContext } from "../hooks/useAuthContext"
import { useGlobalStore } from "../store/useGlobalStore"
import SignOutButton from "./SignOutButton"
import defaultAvatar from "../assets/images/default-avatar.png"
import configIcon from "../assets/icons/configIcon.svg"

const Sidebar = () => {
    const { authUser: actualUser } = useAuthContext()
    const conversations = useGlobalStore((state) => state.conversations)
    const users = useGlobalStore((state) => state.users)
    const setSelectedConversation = useGlobalStore((state) => state.setSelectedConversation)
    const selectedConversation = useGlobalStore((state) => state.selectedConversation)

    if (!actualUser || !conversations || !users) return <p>Loading...</p>

    // IDs de los usuarios con los que ya existe conversación
    const activeConversations = new Set(conversations.map((conv) => conv.participants.find((p) => p._id !== actualUser?._id)?._id))
    // Filtrar usuarios que no están en conversaciones activas
    const contacts = users.filter(u => !activeConversations.has(u._id))

    return (
        <div className="flex flex-col h-full gap-5">
            <header className="flex justify-between p-5">
                <img
                    src={actualUser?.profilePic || defaultAvatar}
                    alt={actualUser?.userName}
                    className="object-cover rounded-full w-14 h-14"
                />
                <div className="flex gap-5">
                    <button><img src={configIcon} alt="Logo" className="w-auto h-5 cursor-pointer"/></button>
                    <SignOutButton />
                </div>
            </header>

            <h2 className="px-5 text-[#6785FF] font-medium text-lg">Chats activos</h2>
            {conversations.length === 0 ? "" :
                <section className="flex flex-col px-5 gap-5 overflow-y-auto max-h-[38%]">
                    
                    {conversations.map((conv) => {
                        const receiver = conv.participants.find(
                            (p) => p._id !== actualUser?._id
                        )

                        // Verificar si la conversación actual es la seleccionada
                        const isSelected = selectedConversation?._id === conv._id

                        return (
                            <div
                                key={conv._id}
                                className={`flex items-center gap-5 p-5 rounded-lg cursor-pointer transition-colors duration-500 ${isSelected ? "bg-[#6785FF]" : "bg-[#303346] hover:bg-[#6785FF]"} `}
                                onClick={() => setSelectedConversation(conv)}
                            >
                                <img
                                    src={receiver?.profilePic || defaultAvatar}
                                    alt={receiver?.userName}
                                    className="object-cover w-10 h-10 rounded-full"
                                />

                                <div>
                                    <h3>{receiver?.userName}</h3>
                                    <p className="text-xs text-gray-400">{conv.messages[conv.messages.length - 1].message}</p>
                                </div>
                            </div>
                        )
                    })}
                </section>
            }
            
            <h2 className="px-5 text-[#6785FF] font-medium text-lg">Contactos</h2>
            {contacts.length === 0 ? "" :
                <section className="flex flex-col gap-5 px-5 overflow-y-auto max-h-[38%]">
                    {contacts.map((contact) => {
                        // Verificar si la conversación actual es la seleccionada
                        const isSelected = selectedConversation && selectedConversation.participants.some(
                            (p) => p._id === contact._id
                        )

                        return (
                            <div 
                                key={contact._id} 
                                className={`flex items-center gap-5 p-5 rounded-lg cursor-pointer transition-colors duration-500 ${isSelected ? "bg-[#6785FF]" : "bg-[#303346] hover:bg-[#6785FF]"} `}
                                onClick={() =>
                                    setSelectedConversation({
                                        participants: [contact, actualUser],
                                        messages: []
                                    })
                                }
                            >
                                <img src={contact.profilePic || defaultAvatar} alt={contact.userName} className="object-cover w-10 h-10 rounded-full" />
                                <h3>{contact.userName}</h3>
                            </div>
                        )
                    })}
                </section>
            }
        </div>
    )
}

export default Sidebar