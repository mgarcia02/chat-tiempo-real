import { useAuthContext } from "../hooks/useAuthContext"

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
        {loading ? "Cerrando sesión..." : "Sign Out"}
        </button>
    )
}

export default SignOutButton