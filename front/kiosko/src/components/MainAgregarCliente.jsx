/* eslint-disable no-unused-vars */
import '../CSS/MainClientes.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { clientes_crear_URL, clientes } from '../constants/constants'
import { useState } from 'react'

const MainAgregarCliente = () => {

    const navigate = useNavigate()

    const [nombre, setNombre] = useState()
    const [apellido, setApellido] = useState()
    const [telefono, setTelefono] = useState()
    const [domicilio, setDomicilio] = useState()

    const formAgregar = document.getElementById('formAgregar')

    const handleGuardarCliente = async (e) => {
        e.preventDefault()
        await axios.post(clientes_crear_URL, {
            nombreC: nombre,
            apellidoC: apellido,
            telefono: telefono,
            domicilio: domicilio,
            borrar: 0
        })
            .then((result) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Guardado',
                    text: 'El registro del cliente se guardó con exito.',
                    confirmButtonColor: '#a5f063',
                    showCloseButton: true,
                    timer: 2000,
                    timerProgressBar: true,
                })
                formAgregar.reset()
                setTimeout(() => {
                    navigate(clientes)
                }, 2010);
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


    return (
        <div className="container p-4 main-clientes">
            <div className="row justify-content-center">
                <h1 className="titulo-clientes text-center">Agregar Cliente</h1>
                <div className="col-8 d-flex flex-column align-items-center mt-4 formA">
                    <form id="formAgregar" onSubmit={handleGuardarCliente}>
                        <div className='mb-3'>
                            <label htmlFor="txtNombre" className='form-label me-3'>Nombre:</label>
                            <input type="text" id="txtNombre" onChange={(e) => { setNombre(e.target.value) }} required autoComplete='off' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="txtApellido" className='form-label me-3'>Apellido: </label>
                            <input type="text" id="txtApellido" onChange={(e) => { setApellido(e.target.value) }} required autoComplete='off' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="txtTelefono" className='form-label me-3'>Telefono: </label>
                            <input type="text" id='txtTelefono' onChange={(e) => { setTelefono(e.target.value) }} required autoComplete='off' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="txtDomicilio" className='form-label me-3'>Domicilio: </label>
                            <input type="text" id='txtDomicilio' onChange={(e) => { setDomicilio(e.target.value) }} required autoComplete='off' />
                        </div>
                        <div className="mb-3 d-flex justify-content-center gap-2">
                            <Link to={clientes} onClick={() => { formAgregar.reset() }}><button className="btn btn-secondary" type='button'>Cancelar y Volver</button></Link>
                            <button type="submit" className="btn btn-success">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MainAgregarCliente
