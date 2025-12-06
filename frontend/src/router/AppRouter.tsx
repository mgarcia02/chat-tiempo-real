import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../views/Home.tsx"

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter