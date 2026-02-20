import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {AnimatePresence} from 'framer-motion'
import { Home } from './pages/Home'
import { useAppStore } from './store/UseAppStore'
import { useEffect } from 'react'


export const App = () => {

  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  return (
    <>
    <BrowserRouter>
        <AnimatePresence  mode="wait">
          <Routes>
            <Route path="/" element={<Home/>} />
          </Routes>
          


        </AnimatePresence>

    
    
    </BrowserRouter>


    
      
    </>
  )
}


