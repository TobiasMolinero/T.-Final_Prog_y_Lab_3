import Login from './pages/Login'
import Home from './pages/Home'
import Ventas from './pages/Ventas'
import Productos from './pages/Productos'
import Empleados from './pages/Empleados'
import Clientes from './pages/Clientes'
import AgregarProducto from './pages/AgregarProducto'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { login, home, ventas, productos, empleados, clientes, agregarProducto } from './constants/constants'
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
        {/* <Route path={agregarVenta} element={}></Route> */}
        <Route path={agregarProducto} element={<AgregarProducto/>}></Route>
        {/* <Route path={agregarEmpleado} element={}></Route>
        <Route path={agregarCliente} element={}></Route>
        <Route path={modificarVenta} element={}></Route>
        <Route path={modificarProducto} element={}></Route>
        <Route path={modificarEmpleado} element={}></Route>
        <Route path={modificarCliente} element={}></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
