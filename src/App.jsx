import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { GoalReminderBanner } from './components/GoalReminderBanner'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useAppStore } from './store/UseAppStore'
import { useEffect } from 'react'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { Feed } from './pages/Feed'
import { Groups } from './pages/Groups'
import { Profile } from './pages/Profile'
import { Chat } from './pages/Chat'
import { Tempchat } from './pages/tempchat'
import { ErrorPage } from './pages/error'
import { HomeRoute } from './pages/Home/HomeRoute'
import GrogWidget from './components/chat/GrogWidget'

export const App = () => {

  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <>
      <GrogWidget />
      <GoalReminderBanner />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
          <Route path="/groups" element={<ProtectedRoute><Groups /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />

          <Route path="/tmp" element={<Tempchat />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
