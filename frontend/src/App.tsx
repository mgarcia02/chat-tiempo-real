import './styles/index.css'
import AppRouter from './router/AppRouter'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <ToastContainer toastStyle={{background: "#252837", color: "#ffffff"}}/>
      <AppRouter />
    </>
  )
}

export default App
