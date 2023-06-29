/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { empleados, empleados_URL, empleados_editar_URL, turnos_URL } from "../constants/constants"
import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"

const MainEditarEmpleado = () => {

    let { id } = useParams()
    let navigate = useNavigate()

    const formEditar = document.getElementById('formEditar')
    const selectT = document.getElementById('selectT')

    const [turnos, setTurnos] = useState([])

    const [nombre, setNombre] = useState()
    const [apellido, setApellido] = useState()
    const [sueldo, setSueldo] = useState()
    const [turno, setTurno] = useState()

    const getTurnos = async () => {
        let response = await axios.get(turnos_URL)
        setTurnos(response.data)
    }

    const getEmpleado = async () => {
        let response = await axios.get(empleados_URL + id)
        setNombre(response.data[0].nombreE)
        setApellido(response.data[0].apellidoE)
        setSueldo(response.data[0].sueldo)
        setTurno(response.data[0].idTurno)
        console.log(response.data)
    }

    const handleEditarEmpleado = async (e) => {
        e.preventDefault()
        await axios.put(empleados_editar_URL + id, {
            nombreE: nombre,
            apellidoE: apellido,
            sueldo: sueldo,
            idTurno: turno,
            estado: 1
        })
            .then((result) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Guardado',
                    text: 'El empleado se modificó con exito. Volviendo a empleados',
                    showConfirmButton: false,
                    timer: 1800,
                    timerProgressBar: true,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    allowEnterKey: false,
                })
                setTimeout(() => {
                    navigate(empleados)
                }, 2020);
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

    const disabledInputSueldo = (e) => {
        if(e.keyCode === 109 || e.keyCode === 189 || e.keyCode === 107 || e.keyCode === 187 || e.keyCode === 188 || e.keyCode === 69) {
            e.preventDefault()
        }
    }

    useEffect(() => {
        getTurnos()
        setTimeout(() => {
            getEmpleado()
        }, 100);
    }, [])

    return (
        <div className="container p-4 main-empleados">
            <div className="row justify-content-center">
                <h1 className="titulo-empleados text-center">Editar Empleado</h1>
                <div className="col-8 d-flex flex-column align-items-center mt-4 formE bg-warning">
                    <form id="formEditar" className="mt-3" onSubmit={handleEditarEmpleado}>
                        <div className='mb-3'>
                            <label htmlFor="txtNombre" className='form-label me-3'>Nombre:</label>
                            <input type="text" id="txtNombre" defaultValue={nombre} onChange={(e) => { setNombre(e.target.value) }} autoComplete='off' required />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="txtApellido" className='form-label me-3'>Apellido: </label>
                            <input type="text" id="txtApellido" defaultValue={apellido} onChange={(e) => { setApellido(e.target.value) }} autoComplete='off' required />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="txtSueldo" className='form-label me-3'>*Sueldo: </label>
                            <input type="number" id='txtSueldo' defaultValue={sueldo} onKeyDown={disabledInputSueldo} onChange={(e) => { setSueldo(e.target.value) }} min={0} step={0.01} autoComplete='off' required placeholder='Ej: 250.54'/>
                        </div>
                        <div className='mb-3'>
                            <select className="form-select" id="selectT" aria-label="Default select example" value={turno} onChange={(e) => { setTurno(e.target.value) }} required>
                                {turnos.map(turno =>
                                    <option key={turno.id_turno} value={turno.id_turno}>{turno.tipo_turno}</option>
                                )}
                            </select>
                        </div>
                        <div className="mb-3 d-flex justify-content-center gap-2">
                            <Link to={empleados} onClick={() => { formEditar.reset() }}><button className="btn btn-secondary">Cancelar y Volver</button></Link>
                            <button type="submit" className="btn btn-success">Guardar</button>
                        </div>
                    </form>
                    <p>(*)Se aceptan hasta 8 números enteros y solo se aceptan dos números decimales.</p>
                </div>
            </div>
        </div>
    )
}

export default MainEditarEmpleado
