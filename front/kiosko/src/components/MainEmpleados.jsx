/* eslint-disable no-unused-vars */
import '../CSS/MainEmpleados.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { empleados_URL, turnos_URL } from '../constants/constants'

const MainEmpleados = () => {

  const [empleados, setEmpleados] = useState([])
  const [turnos, setTurnos] = useState([])

  const [nombre, setNombre] = useState()
  const [apellido, setApellido] = useState()
  const [sueldo, setSueldo] = useState()
  const [turno, setTurno] = useState()

  const formAgregar = document.getElementById('formAgregar')

  const getAllEmpleados = async () => {
    let response = await axios.get(empleados_URL)
    setEmpleados(response.data)
  }

  const getTurnos = async () => {
    let response = await axios.get(turnos_URL)
    setTurnos(response.data)
  }

  const handleGuardarEmpleado = async (e) => {
    e.preventDefault()
    await axios.post(empleados_URL, {
      nombre: nombre,
      apellido: apellido,
      sueldo: sueldo,
      idTurno: turno,
    }).then((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'El registro del nuevo empleado se guardó con exito.',
        confirmButtonColor: '#a5f063',
        showCloseButton: true,
        timer: 2000,
        timerProgressBar: true
      })
      getAllEmpleados()
      formAgregar.reset()
    }).catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: err,
        showCloseButton: true,
        timer: 2000,
        timerProgressBar: true
      })
    });
  }

  useEffect(() => {
    getTurnos()
    setTimeout(() => {
      getAllEmpleados()
    }, 100)
  }, [])

  return (
    <div className='container p-4 main-empleados'>
      <h1 className='titulo-empleados'>Empleados</h1>
      <div className="row">
        <div className="col-9">
          <table className='table mt-4 text-center'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Nombre</th>
                <th scope='col'>Apellido</th>
                <th scope='col'>Sueldo</th>
                <th scope='col'>Turno</th>
                <th scope='col'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map(empleado =>
                <tr key={empleado.idEmpleado}>
                  <td>{empleado.idEmpleado}</td>
                  <td>{empleado.nombre}</td>
                  <td>{empleado.apellido}</td>
                  <td>{empleado.sueldo}</td>
                  <td>{turnos[empleado.idTurno - 1].tipo_turno}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                      <button type="button" className="btn btn-danger"><i className="bi bi-trash"></i></button>
                      <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdropEditar"><i className="bi bi-pencil-square"></i></button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-3">
          <div className="col-12 d-flex justify-content-end mt-4">
            <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="bi bi-plus-circle me-2"></i>Agregar Empleado</button>
          </div>
        </div>

        {/* MODAL */}
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header modal-header-empleados">
                <h2 className="modal-title fs-5" id="staticBackdropLabel">Agregar Empleado</h2>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body modal-body-empleados">
                <form onSubmit={handleGuardarEmpleado}>
                  <div className='mb-3'>
                    <label htmlFor="txtNombre" className='form-label me-3'>Nombre:</label>
                    <input type="text" id="txtNombre" onChange={(e) => { setNombre(e.target.value) }} autoComplete='off' />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtApellido" className='form-label me-3'>Apellido: </label>
                    <input type="text" id="txtApellido" onChange={(e) => { setApellido(e.target.value) }} autoComplete='off' />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtSueldo" className='form-label me-3'>Sueldo: </label>
                    <input type="text" id='txtSueldo' onChange={(e) => { setSueldo(e.target.value) }} autoComplete='off' />
                  </div>
                  <div className='mb-3'>
                    <select className="form-select" aria-label="Default select example" defaultValue='selected' onChange={(e) => { setTurno(e.target.value) }}>
                      <option value="selected">-- SELECCIONE EL TURNO --</option>
                      {turnos.map(turno =>
                        <option key={turno.id_turno} value={turno.id_turno}>{turno.tipo_turno}</option>
                      )}
                    </select>
                  </div>
                  <div className="mb-3 d-flex justify-content-center gap-2">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Guardar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* MODAL - AGREGAR */}

        {/* MODAL - EDITAR*/}
        <div className="modal fade" id="staticBackdropEditar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-warning">
                <h2 className="modal-title fs-5" id="staticBackdropLabel">Modificar Empleado</h2>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body modal-body-empleados">
                <form>
                  {/* <div className='mb-3'>
                    <label htmlFor="txtNombreG" className='form-label me-3'>Nombre:</label>
                    <input type="text" id="txtNombreG" />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtApellidoG" className='form-label me-3'>Apellido: </label>
                    <input type="text" id="txtApellidoG" />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtTurnoG" className='form-label me-3'>Turno: </label>
                    <input type="text" id='txtTurnoG' />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtSueldoG" className='form-label me-3'>Sueldo: </label>
                    <input type="text" id='txtSueldoG' />
                  </div> */}
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Guardar Cambios</button>
              </div>
            </div>
          </div>
        </div>
        {/* MODAL - EDITAR */}

      </div>
    </div>
  )
}

export default MainEmpleados


// Iconos
{/* <i class="bi bi-trash"></i> */ }
{/* <i class="bi bi-pencil-square"></i> */ }