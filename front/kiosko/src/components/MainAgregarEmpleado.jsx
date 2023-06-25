/* eslint-disable no-unused-vars */
import '../CSS/MainEmpleados.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { empleados, empleados_crear_URL, turnos_URL } from '../constants/constants'
import { Link, useNavigate } from 'react-router-dom'

const MainAgregarEmpleado = () => {

    const navigate = useNavigate()

    const [turnos, setTurnos] = useState([])

    const [nombre, setNombre] = useState()
    const [apellido, setApellido] = useState()
    const [sueldo, setSueldo] = useState()
    const [turno, setTurno] = useState()

    const formAgregar = document.getElementById('formAgregar')
    const selectT = document.getElementById('selectT')

    const getTurnos = async () => {
        let response = await axios.get(turnos_URL)
        setTurnos(response.data)
    }

    const handleGuardarEmpleado = async (e) => {
        e.preventDefault()
        if(selectT.value === 'selected' || selectT.value === ''){
            Swal.fire({
                icon: 'warning',
                title: 'Atención',
                text: 'Debe seleccionar una categoria.',
                confirmButtonColor: '#a5f063',
                confirmButtonText: 'Aceptar',
                timer: 2000,
                timerProgressBar: true
            })
        } else {
            await axios.post(empleados_crear_URL, {
                nombreE: nombre,
                apellidoE: apellido,
                sueldo: sueldo,
                idTurno: turno,
                borrar: 0
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
                formAgregar.reset()
                setTimeout(() => {
                    navigate(empleados)
                }, 2015);
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
    }

    useEffect(() => {
        getTurnos()
    }, [])

    return (
        <div className="container p-4 main-empleados">
            <div className="row justify-content-center">
                <h1 className="titulo-empleados text-center">Agregar Empleado</h1>
                <div className="col-8 d-flex flex-column align-items-center mt-4 formA">
                    <form id="formAgregar" className="mt-3" onSubmit={handleGuardarEmpleado}>
                        <div className='mb-3'>
                            <label htmlFor="txtNombre" className='form-label me-3'>Nombre:</label>
                            <input type="text" id="txtNombre" onChange={(e) => { setNombre(e.target.value) }} autoComplete='off' required/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="txtApellido" className='form-label me-3'>Apellido: </label>
                            <input type="text" id="txtApellido" onChange={(e) => { setApellido(e.target.value) }} autoComplete='off' required/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="txtSueldo" className='form-label me-3'>*Sueldo: </label>
                            <input type="text" id='txtSueldo' onChange={(e) => { setSueldo(e.target.value) }} autoComplete='off' required placeholder='Ej: 250.54'/>
                        </div>
                        <div className='mb-3'>
                            <select className="form-select" id='selectT' aria-label="Default select example" onChange={(e) => { setTurno(e.target.value) }} required>
                            <option value="selected">-- SELECCIONE TURNO --</option>
                                {turnos.map(turno =>
                                    <option key={turno.id_turno} value={turno.id_turno}>{turno.tipo_turno}</option>
                                )}
                            </select>
                        </div>
                        <div className="mb-3 d-flex justify-content-center gap-2">
                            <Link to={empleados} onClick={()=>{formAgregar.reset()}}><button className="btn btn-secondary" type="button">Cancelar y Volver</button></Link>
                            <button type="submit" className="btn btn-success">Guardar</button>
                        </div>
                    </form>
                    <p>(*)Para decimales se debe utilizar un punto.</p>
                </div>
            </div>
        </div>
    )
}

export default MainAgregarEmpleado