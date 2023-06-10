import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import { login, home } from './constants/constants'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={login} element={<Login/>}></Route>
        <Route path={home} element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
