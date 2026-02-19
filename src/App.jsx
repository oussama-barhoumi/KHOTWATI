
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import ContentAbout from './pages/about'


function App() {

  return (
    <>
    

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<ContentAbout/>}/>
      </Routes>
      
    
    </>
  )
}
export default App
