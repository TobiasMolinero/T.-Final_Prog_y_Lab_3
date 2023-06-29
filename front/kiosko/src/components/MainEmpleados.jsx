/* eslint-disable no-unused-vars */
import '../CSS/MainEmpleados.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { empleados_URL, empleados_eliminar_URL, editarEmpleado, agregarEmpleado } from '../constants/constants'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const MainEmpleados = () => {

  const [empleados, setEmpleados] = useState([])

  const getAllEmpleados = async() => {
    let response = await axios.get(empleados_URL)
    setEmpleados(response.data)
  }

  const handleBorrarEmpleado = (id) => {
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
        axios.put(empleados_eliminar_URL + id)
          .then((result) => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'El registro se eliminó con exito.',
              showConfirmButton: false,
              showCloseButton: true,
              timer: 2000,
              timerProgressBar: true
            })
            getAllEmpleados()
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
    getAllEmpleados()
  }, [])

  return (
    <div className='container p-4 main-empleados'>
      <h1 className='titulo-empleados text-center'>Empleados</h1>
      <div className="row">
        <div className="col-9">
          <Table bordered hover striped className='table mt-4 text-center'>
            <thead>
              <tr>
                <th scope='col'>Nombre</th>
                <th scope='col'>Apellido</th>
                <th scope='col'>Sueldo</th>
                <th scope='col'>Turno</th>
                <th scope='col'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleados.length === 0 ? <tr><td colSpan={6}><h4>No hay empleados registrados</h4></td></tr> : empleados.map(empleado =>
                <tr key={empleado.idEmpleado}>
                  <td>{empleado.nombreE}</td>
                  <td>{empleado.apellidoE}</td>
                  <td>$ {empleado.sueldo}</td>
                  <td>{empleado.tipo_turno}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                      <button type="button" className="btn btn-danger" onClick={()=>{handleBorrarEmpleado(empleado.idEmpleado)} }><i className="bi bi-trash"></i></button>
                      <Link to={editarEmpleado + empleado.idEmpleado}>
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
            <Link to={agregarEmpleado}>
              <button className="btn btn-success btnAgregar" type="button" ><i className="bi bi-plus-circle me-2"></i>Agregar Empleado</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainEmpleados


// Iconos
{/* <i class="bi bi-trash"></i> */ }
{/* <i class="bi bi-pencil-square"></i> */ }