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
// import { Tempchat } from './pages/tempchat'

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
        <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
        <Route path="/groups" element={<ProtectedRoute><Groups /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        {/* <Route path="/tmp" element={<Tempchat />} /> */}

      </Routes>
    </AnimatePresence>
    </>
  )
}

