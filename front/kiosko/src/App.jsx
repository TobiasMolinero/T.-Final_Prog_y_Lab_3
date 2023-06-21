import Login from './pages/Login'
import Home from './pages/Home'
import Ventas from './pages/Ventas'
import Productos from './pages/Productos'
import Empleados from './pages/Empleados'
import Clientes from './pages/Clientes'
import EditarProducto from './pages/EditarProducto'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { login, home, ventas, productos, empleados, clientes, editarProducto } from './constants/constants'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={login} element={<Login/>}></Route>
        <Route path={home} element={<Home/>}></Route>
        <Route path={ventas} element={<Ventas/>}></Route>
        <Route path={productos} element={<Productos/>}></Route>
        <Route path={empleados} element={<Empleados/>}></Route>
        <Route path={clientes} element={<Clientes/>}></Route>
        <Route path={editarProducto + ':id'} element={<EditarProducto/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
