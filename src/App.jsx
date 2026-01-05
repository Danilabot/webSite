import styles from './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './UI/Navbar/Navbar'
import { AppRouter } from './components/AppRouter'
import { AuthProvider } from './context/AuthProvider'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
