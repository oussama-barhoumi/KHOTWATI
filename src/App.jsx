import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { Home } from './pages/Home'
import { useAppStore } from './store/UseAppStore'
import { useEffect } from 'react'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { Feed } from './pages/Feed'
import { Groups } from './pages/Groups'
import { Profile } from './pages/Profile'
import { Chat } from './pages/Chat'

export const App = () => {

  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </AnimatePresence>
  )
}

