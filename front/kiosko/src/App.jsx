import Login from './pages/Login'
import Home from './pages/Home'
import Ventas from './pages/Ventas'
import Productos from './pages/Productos'
import Categorias from './pages/Categorias'
import Empleados from './pages/Empleados'
import Clientes from './pages/Clientes'
import PerfilUsuario from './pages/PerfilUsuario'
import AgregarVenta from './pages/AgregarVenta'
import AgregarProducto from './pages/AgregarProducto'
import AgregarEmpleado from './pages/AgregarEmpleado'
import AgregarCliente from './pages/AgregarCliente'
import EditarVenta from './pages/EditarVenta'
import EditarProducto from './pages/EditarProducto'
import EditarEmpleado from './pages/EditarEmpleado'
import EditarCliente from './pages/EditarCliente'
import DetalleVenta from './pages/DetalleVenta'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { login, home, ventas, productos, empleados, clientes,  agregarVenta, agregarProducto, agregarEmpleado, agregarCliente, editarVenta, editarProducto, editarEmpleado, editarCliente, categorias, usuario, detalleVenta } from './constants/constants'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={login} element={<Login/>}></Route>
        <Route path={home} element={<Home/>}></Route>
        <Route path={ventas} element={<Ventas/>}></Route>
        <Route path={productos} element={<Productos/>}></Route>
        <Route path={categorias} element={<Categorias/>}></Route>
        <Route path={empleados} element={<Empleados/>}></Route>
        <Route path={clientes} element={<Clientes/>}></Route>
        <Route path={usuario} element={<PerfilUsuario/>}></Route>
        <Route path={agregarVenta} element={<AgregarVenta/>}></Route>
        <Route path={agregarProducto} element={<AgregarProducto/>}></Route>
        <Route path={agregarEmpleado} element={<AgregarEmpleado/>}></Route>
        <Route path={agregarCliente} element={<AgregarCliente/>}></Route>
        <Route path={editarVenta + ':id'} element={<EditarVenta/>}></Route>
        <Route path={editarProducto + ':id'} element={<EditarProducto/>}></Route>
        <Route path={editarEmpleado + ':id'} element={<EditarEmpleado/>}></Route>
        <Route path={editarCliente + ':id'} element={<EditarCliente/>}></Route>
        <Route path={detalleVenta + ':id'} element={<DetalleVenta/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
