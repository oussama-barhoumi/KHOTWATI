import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { GoalReminderBanner } from './components/GoalReminderBanner'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Home } from './pages/Home'
import { useAppStore } from './store/UseAppStore'
import { useEffect } from 'react'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { Feed } from './pages/Feed'
import { Groups } from './pages/Groups'
import { Profile } from './pages/Profile'
import { Chat } from './pages/Chat'
import { Tempchat } from './pages/tempchat'

export const App = () => {

  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <>
    <GoalReminderBanner />
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
<<<<<<< HEAD
        <Route path="/feed" element={<Feed />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/tmp" element={<Tempchat />} />
=======
        <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
        <Route path="/groups" element={<ProtectedRoute><Groups /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
>>>>>>> 53e501dcd4c07931986d410e23995f8509ddcc98
      </Routes>
    </AnimatePresence>
    </>
  )
}

