/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import '../CSS/MainVentas.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import { agregarVenta, editarVenta, ventas_URL, ventas_eliminar_URL } from '../constants/constants'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const MainVentas = () => {
  
  const [ventas, setVentas] = useState([])

  const getAllVentas = async() => {
    let response = await axios.get(ventas_URL)
    setVentas(response.data)
  }

  const handleBorrarVenta = (id) => {
    Swal.fire({
      icon: 'warning',
      text: '¿Esta seguro que quiere borrar este registro?',
      showCancelButton: true,
      cancelButtonColor: 'grey',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Borrar',
      confirmButtonColor: '#FF2E11',
      allowOutsideClick: false,
      allowEnterKey: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(ventas_eliminar_URL + id)
          .then((result) => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'El registro se eliminó con exito.',
              showCloseButton: true,
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            })
            getAllVentas()
          }).catch((err) => {
            Swal.fire({
              icon: 'error',
              title: 'ERROR',
              showCloseButton: true,
              text: 'No se pudo eliminar el registro.',
              confirmButtonColor: '#FF2E11',
            })
          });
      }
    })
  }

  useEffect(() => {
    getAllVentas()
  }, [])

  return (
    <div className="container p-4 mb-5 main-ventas">
      <h1 className="titulo-ventas text-center">Ventas</h1>
      <div className="row">
        {/* <div className="col-6 d-flex align-items-end">
          <form className='text-center'>
            <select className='form-select' id='selectV' defaultValue='selected'>
              <option value="selected">Filtrar por:</option>
              <option>Nro. Factura</option>
              <option>Empleados</option>
              <option>Clientes</option>
              <option>Productos</option>
            </select>
          </form>
        </div> */}
        <div className="col-12 d-flex justify-content-end">
          <Link to={agregarVenta}>
            <button className="btn btn-success btnAgregar" type="button"><i className="bi bi-plus-circle me-2"></i>Agregar Venta</button>
          </Link>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-12">
          <Table striped bordered hover className="table mt-4 text-center">
            <thead>
              <tr>
                <th scope="col">Nro. Factura</th>
                <th scope="col">Empleado</th>
                <th scope="col">Cliente</th>
                <th scope="col">Producto</th>
                <th scope="col">Fecha</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Importe Total</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventas.length === 0 ? <tr><td colSpan={9}><h2>No hay ventas registradas</h2></td></tr> : ventas.map(venta => 
                <tr key={venta.idVenta}>
                  <td>{venta.nroFactura}</td>
                  <td>{venta.nombreE}{' '}{venta.apellidoE}</td>
                  <td>{venta.nombreC}{' '}{venta.apellidoC}</td>
                  <td>{venta.descripcion}</td>
                  <td>{(venta.fecha).substring(0, 10)}</td>
                  <td>{venta.cantidad}</td>
                  <td>$ {venta.total}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                      <button type="button" className="btn btn-danger" onClick={() => handleBorrarVenta(venta.idVenta)}><i className="bi bi-trash"></i></button>
                      <Link to={editarVenta + venta.idVenta}>
                        <button type="button" className="btn btn-warning"><i className="bi bi-pencil-square"></i></button>
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default MainVentas

// Iconos
{/* <i class="bi bi-trash"></i> */}
{/* <i class="bi bi-pencil-square"></i> */}