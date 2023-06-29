import {ventas, productos, empleados, clientes} from '../constants/constants.js'
import {Link} from 'react-router-dom'
import brandHome from '../assets/brand-home.png'
import imagenVenta from '../assets/imagenVenta.png'
import imagenProductos from '../assets/imagenProductos.png'
import imagenEmpleados from '../assets/imagenEmpleados.png'
import imagenClientes from '../assets/imagenClientes.png'
import '../CSS/MainHome.css'
// import { useState } from 'react'

const MainHome = () => {

  

  return (
    <main>
      <div className="container py-4">
        <div className="row d-flex">
          <div className="col-12 col-sm-12 col-md-12 col-lg-5">
            {/* <h1 className="text-center tituloMain">KIOSKO LA ESQUINA</h1> */}
              <img src={brandHome} className='mt-3 brand-home' alt="logo" title='logo'/>
            {/* <h2 className="text-center subTituloMain">Sistema de gestión</h2> */}
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-7 mt-4 px-5">
            <div className="row row-cols-md-2 g-4">
              <div className="col">
                <div className="card h-100 d-flex flex-column align-items-center">
                  <figure className='fondo-img mt-4'>
                    <img src={imagenVenta} className="card-img-top imagenCard" alt="img-ventas"/>
                  </figure>
                    <div className="card-body d-flex flex-column align-items-center">
                      <h5 className="card-title"><b className="text-bold">Ventas</b></h5>
                      <button type='button' className='btn btn-danger botonesMain'><Link className='link-card' to={ventas}>Ver</Link></button>
                    </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 d-flex flex-column align-items-center">
                  <figure className='fondo-img mt-4'>
                    <img src={imagenProductos} className="card-img-top imagenCard" alt="img-productos"/>
                  </figure>
                    <div className="card-body d-flex flex-column align-items-center">
                      <h5 className="card-title"><b className="text-bold">Productos</b></h5>
                      <button type='button' className='btn btn-danger botonesMain'><Link className='link-card' to={productos}>Ver</Link></button>
                    </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 d-flex flex-column align-items-center">
                  <figure className='fondo-img mt-4'>
                    <img src={imagenEmpleados} className="card-img-top imagenCard" alt="img-empleados"/>
                  </figure>
                    <div className="card-body d-flex flex-column align-items-center">
                      <h5 className="card-title"><b className="text-bold">Empleados</b></h5>
                      <button type='button' className='btn btn-danger botonesMain'><Link className='link-card' to={empleados}>Ver</Link></button>
                    </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 d-flex flex-column align-items-center">
                  <figure className='fondo-img mt-4'>
                    <img src={imagenClientes} className="card-img-top imagenCard" alt="img-clientes"/>
                  </figure>
                    <div className="card-body d-flex flex-column align-items-center">
                      <h5 className="card-title"><b className="text-bold">Clientes</b></h5>
                      <button type='button' className='btn btn-danger botonesMain'><Link className='link-card' to={clientes}>Ver</Link></button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MainHome
