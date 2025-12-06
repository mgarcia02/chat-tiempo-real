import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../views/Home.tsx"
import SignIn from "../views/SignIn.tsx"
import SignUp from "../views/SignUp.tsx"

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter