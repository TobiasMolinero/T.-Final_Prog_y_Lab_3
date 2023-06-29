/* eslint-disable no-unused-vars */
import '../CSS/MainClientes.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { agregarCliente, clientes_URL, clientes_crear_URL, clientes_eliminar_URL, editarCliente } from '../constants/constants'
import { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'

const MainClientes = () => {

  const [clientes, setClientes] = useState([])

  const getAllClients = async() => {
    let response = await axios.get(clientes_URL)
    setClientes(response.data)
  }

  const handleBorrarCliente = (id) => {
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
      if(result.isConfirmed){
        axios.put(clientes_eliminar_URL + id)
        .then((result) => {
          Swal.fire({
            icon: 'success',
            text: 'Se eliminó el registro con exito',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            showCloseButton: true, 
          })
          getAllClients()
        }).catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            showCloseButton: true,
            text: 'No se pudo eliminar el registro. Probablemente se encuentre registrado en una venta',
            confirmButtonColor: '#FF2E11',
          })
        });

      }
    })
  }

  useEffect(() => {
    getAllClients()
  }, [])

  return (
    <div className='container p-4 main-clientes'>
      <h1 className='titulo-clientes text-center'>Clientes</h1>
      <div className="row">
        <div className="col-9">
          <Table striped bordered hover className='table mt-4 text-center rounded'>
            <thead>
              <tr>
                <th scope='col'>Nombre</th>
                <th scope='col'>Apellido</th>
                <th scope='col'>Telefono</th>
                <th scope='col'>Domicilio</th>
                <th scope='col'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.length === 0 ? <tr><td colSpan={6}><h4>No hay clientes registrados</h4></td></tr> : clientes.map(cliente => 
                <tr key={cliente.idCliente}>
                  <td>{cliente.nombreC}</td>
                  <td>{cliente.apellidoC}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.domicilio}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                      <button type="button" className="btn btn-danger" onClick={() => handleBorrarCliente(cliente.idCliente)}><i className="bi bi-trash"></i></button>
                      <Link to={editarCliente + cliente.idCliente}>
                        <button type="button" className="btn btn-warning"><i className="bi bi-pencil-square"></i></button>
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div className="col-3">
          <div className="col-12 d-flex justify-content-start mt-4">
            <Link to={agregarCliente}>
              <button className="btn btn-success btnAgregar" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdropAgregar"><i className="bi bi-plus-circle me-2"></i>Agregar Cliente</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainClientes



// Iconos
{/* <i class="bi bi-trash"></i> */}
{/* <i class="bi bi-pencil-square"></i> */}