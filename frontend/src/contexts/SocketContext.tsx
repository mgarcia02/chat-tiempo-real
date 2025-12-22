import { createContext, useEffect, useState, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuthContext } from '../hooks/useAuthContext'
import { useGlobalStore } from '../store/useGlobalStore'
import type { newMessageListenerType, SocketContextType } from '../types/socketTypes'

const SocketContext = createContext<SocketContextType>({ onlineUsers: []})

const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { authUser } = useAuthContext() 
    const { addMessage } = useGlobalStore()
    
    const socketRef = useRef<Socket | null>(null)
    const [onlineUsers, setOnlineUsers] = useState<string[]>([])

    // Crear y destruir socket
    useEffect(() => { 
        if (authUser?._id) { 
            const socket = io("http://localhost:3001", { 
                query: { userId: authUser._id }, withCredentials: true 
            })

            socketRef.current = socket

            return () => { 
                socket.disconnect()
                socketRef.current = null 
            }
        }
    }, [authUser])

    // Listeners estados globales 
    useEffect(() => { 
        const socket = socketRef.current 
        if (!socket) return 

        const handleOnlineUsers = (users: string[]) => { 
            setOnlineUsers(users) 
        } 

        socket.on("getOnlineUsers", handleOnlineUsers) 
        
        return () => { 
            socket.off("getOnlineUsers", handleOnlineUsers) 
        } 
    }, [authUser])

    // Listener de mensajes → delegar a Zustand 
    useEffect(() => { 
        const socket = socketRef.current 
        if (!socket) return 
        
        const handleNewMessage = (payload: newMessageListenerType) => { 
            addMessage(payload) 
        } 
        
        socket.on("newMessage", handleNewMessage)
        
        return () => { 
            socket.off("newMessage", handleNewMessage) 
        } 
    }, [authUser, addMessage])

    return (
        <SocketContext.Provider value={{ onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketContext, SocketContextProvider }