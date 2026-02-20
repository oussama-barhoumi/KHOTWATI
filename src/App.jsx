import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { Home } from './pages/Home'
import { useAppStore } from './store/useAppStore'
import { useEffect } from 'react'


export const App = () => {

  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  return (
    <>
      <AnimatePresence mode="wait">
        
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          
        </Routes>

      </AnimatePresence>
    </>
  )
}

