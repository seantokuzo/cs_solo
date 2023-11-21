import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import WhereArtThou from './pages/WhereArtThou'
import MainMenu from './pages/MainMenu'
import Forbidden from './pages/Forbidden'

const App = () => {
  return (
    <div className="w-full max-w-[100vw] min-h-screen flex flex-col justify-center items-center bg-colorDark">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MainMenu />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="*" element={<WhereArtThou />} />
      </Routes>
    </div>
  )
}

export default App
