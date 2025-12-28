import { useAuthContext } from "../hooks/useAuthContext"
import signOutIcon from "../assets/icons/signOutIcon.svg"

const SignOutButton = () => {
    const { signOut, loading } = useAuthContext()
    
    const handleClick = async () => {
        await signOut()
    }

    return (
        <button
        onClick={handleClick}
        disabled={loading}
        >
        {loading ? "Cerrando sesión..." : <img src={signOutIcon} alt="Logo" className="w-auto h-6 cursor-pointer" />}
        </button>
    )
}

export default SignOutButton