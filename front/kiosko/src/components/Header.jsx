import { Link, useNavigate } from 'react-router-dom'
import { home, ventas, productos, empleados, clientes } from '../constants/constants'
// import brand from '../assets/brand-header.png'
import off from '../assets/off.png'
import '../CSS/Header.css'
import Swal from 'sweetalert2'
// import { useState } from 'react'

const Header = () => {

  const navigate = useNavigate()

  const handleClick = () => {
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
  
  return (
    <header className='header-active'>
      <nav className="navbar navbar-expand-lg">
        {/* <Link to={home}>
          <img src={brand} alt="logo" className='logo' />
        </Link> */}
        <div className="text-center menu-header d-flex justify-content-center " id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to={home}>Inicio</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Menú
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to={ventas}>Ventas</Link></li>
                <li><Link className="dropdown-item" to={productos}>Productos</Link></li>
                <li><Link className="dropdown-item" to={empleados}>Empleados</Link></li>
                <li><Link className="dropdown-item" to={clientes}>Clientes</Link></li>
              </ul>
            </li>
          </ul>
        </div>
        <button type='button' onClick={handleClick} className='btn btn-danger me-3 cerrarSesion' title='Cerrar Sesión'><img src={off} className='off'></img></button>
      </nav>
    </header>
  )
}

export default Header