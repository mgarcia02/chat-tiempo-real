import { useContext } from "react"
import { SocketContext } from "../contexts/SocketContext"

// Hook personalizado para usar el contexto
function useSocketContext() {
    const context = useContext(SocketContext)
    if (!context) {
        throw new Error("useSocketContext debe usarse dentro de SocketContextProvider")
    }
    return context
}

export { useSocketContext }