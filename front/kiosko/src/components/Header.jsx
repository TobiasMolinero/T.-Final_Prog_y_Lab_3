/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom'
import { home, ventas, productos, empleados, clientes } from '../constants/constants'
import brand from '../assets/brand-header.png'
import ventasIcon from '../assets/ventas-nav.png'
import productosIcon from '../assets/productos-nav.png'
import empleadosIcon from '../assets/empleados-nav.png'
import clientesIcon from '../assets/clientes-nav.png'
import '../CSS/Header.css'
import Swal from 'sweetalert2'
import { useState } from 'react'

const Header = () => {

  const navigate = useNavigate()
  // const [header, setHeader] = useState(false)

  const handleCerrarSesion = () => {
    Swal.fire({
      icon: 'question',
      text: '¿Está seguro que desea cerrar sesión?',
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonColor: 'grey',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#a5f063',
      allowOutsideClick: false,
      allowEnterKey: false,
      allowEscapeKey: false,
    }).then((result) => {
      if(result.isConfirmed){
        navigate('/')
      }
    })
  }
  
  // const changeBackground = () => {
  //   if(window.scrollY >= 50){
  //     setHeader(true)
  //   } else {
  //     setHeader(false)
  //   }
  // }

  // window.addEventListener('scroll',changeBackground)

  return (
    <header className='header-active'>
      <nav className="navbar navbar-expand-lg">
        <Link to={home}>
          <img src={brand} alt="logo" className='logo' />
        </Link>
        <div className="text-center menu-header d-flex justify-content-start ms-5" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to={home}><i className="bi bi-house-door-fill me-1"></i>Inicio</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Menú
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to={ventas}><img src={ventasIcon} className='nav-icons'></img>Ventas</Link></li>
                <li><Link className="dropdown-item" to={productos}><img src={productosIcon} className='nav-icons'></img>Productos</Link></li>
                <li><Link className="dropdown-item" to={empleados}><img src={empleadosIcon} className='nav-icons'></img>Empleados</Link></li>
                <li><Link className="dropdown-item" to={clientes}><img src={clientesIcon} className='nav-icons'></img>Clientes</Link></li>
              </ul>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav menu-usuario justify-content-around">
          <li className='nav-item dropdown d-flex flex-row '>
            <a className='nav-link dropdown-toggle' role='button' data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-person-fill me-2"></i>Perfil</a>
            <ul className='dropdown-menu'>
              <li><Link className='dropdown-item'><i className="bi bi-person-fill-gear me-2"></i>Configuración</Link></li>
              <li className='dropdown-item cerrar-sesion' onClick={handleCerrarSesion}><i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión</li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header