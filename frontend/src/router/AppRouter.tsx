import { Route, Routes, Navigate } from "react-router-dom"
import Home from "../views/Home.tsx"
import SignIn from "../views/SignIn.tsx"
import SignUp from "../views/SignUp.tsx"
import { useAuthContext } from "../hooks/useAuthContext.ts"

const AppRouter = () => {
    const { authUser } = useAuthContext()

    return (
        <Routes>
            <Route path="/" element={authUser ? <Home /> : <Navigate to="/signin" replace />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    )
}

export default AppRouter