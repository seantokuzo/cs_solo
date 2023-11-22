import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import WhereArtThou from './pages/WhereArtThou'
import MainMenu from './pages/MainMenu'
import Forbidden from './pages/Forbidden'
import ProtectedRoute from './pages/ProtectedRoute'
import SharedLayout from './pages/SharedLayout'

const App = () => {
  return (
    <div className="w-full max-w-[100vw] min-h-screen flex flex-col justify-center items-center bg-colorDark text-colorLight relative">
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute children={<SharedLayout />} />}
        >
          <Route index element={<MainMenu />} />
        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="*" element={<WhereArtThou />} />
      </Routes>
    </div>
  )
}

export default App
