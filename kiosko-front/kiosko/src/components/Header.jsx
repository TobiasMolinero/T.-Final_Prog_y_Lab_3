import { Link, useNavigate } from 'react-router-dom'
import { home, ventas, productos, empleados, clientes } from '../constants/constants'
import brand from '../assets/brand-header.png'
import '../CSS/Header.css'
// import { useState } from 'react'

const Header = () => {

  // const [navLink, setNavLink] = useState(false)
  // const [header, setHeader] = useState(false)

  // const changeBackground = () => {
  //   if(window.scrollY >= 50){
  //     setHeader(true)
  //   } else {
  //     setHeader(false)
  //   }
  // }

  // window.addEventListener('scroll',changeBackground)
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <header className='header-active'>
      <nav className="navbar navbar-expand-lg">
        <Link to={home}>
          <img src={brand} alt="logo" className='logo' />
        </Link>
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> */}
        <div className="text-center" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
        <button type='button' onClick={handleClick} className='me-5 cerrarSesion'>Cerrar Sesión</button>
      </nav>
    </header>
  )
}

export default Header