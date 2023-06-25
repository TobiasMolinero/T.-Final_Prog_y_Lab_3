/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { clientes, clientes_URL, clientes_editar_URL } from "../constants/constants"
import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"

const MainEditarCliente = () => {

    let {id} = useParams()
    let navigate = useNavigate()
    const formEditar = document.getElementById('formEditar')

    const [nombre, setNombre] = useState()
    const [apellido, setApellido] = useState()
    const [telefono, setTelefono] = useState()
    const [domicilio, setDomicilio] = useState()

    const getCliente = async() => {
        let response = await axios.get(clientes_URL + id)
        setNombre(response.data[0].nombreC)
        setApellido(response.data[0].apellidoC)
        setTelefono(response.data[0].telefono)
        setDomicilio(response.data[0].domicilio)
    }

    const handleEditarCliente = async(e) => {
        e.preventDefault()
        await axios.put(clientes_editar_URL + id, {
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
                text: 'El Cliente se modificó con exito. Volviendo a clientes.',
                showConfirmButton: false,
                timer: 1800,
                timerProgressBar: true
            })
            setTimeout(() => {
              navigate(clientes)  
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

    useEffect(() => {
        getCliente()
    }, [])

    return (
        <div className="container p-4 main-clientes">
            <div className="row justify-content-center">
                <h1 className="titulo-clientes text-center">Editar Cliente</h1>
                <div className="col-8 d-flex flex-column align-items-center mt-4 bg-warning formE">
                    <form id="formEditar" className="mt-3" onSubmit={handleEditarCliente}>
                        <div className='mb-3'>
                            <label htmlFor="txtNombre" className='form-label me-3'>Nombre:</label>
                            <input type="text" id="txtNombre" defaultValue={nombre} onChange={(e) => { setNombre(e.target.value) }} autoComplete='off' required/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="txtApellido" className='form-label me-3'>Apellido: </label>
                            <input type="text" id="txtApellido" defaultValue={apellido} onChange={(e) => { setApellido(e.target.value) }} autoComplete='off' required/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="txtTelefono" className='form-label me-3'>Telefono: </label>
                            <input type="text" id='txtTelefono' defaultValue={telefono} onChange={(e) => { setTelefono(e.target.value) }} autoComplete='off' required/>
                        </div>
                        <div className='mb-3'>
                        <label htmlFor="txtDomicilio" className='form-label me-3'>Domicilio: </label>
                            <input type="text" id='txtDomicilio' defaultValue={domicilio} onChange={(e) => { setDomicilio(e.target.value) }} autoComplete='off' required/>
                        </div>
                        <div className="mb-3 d-flex justify-content-center gap-2">
                            <Link to={clientes} onClick={()=>{formEditar.reset()}}><button className="btn btn-secondary">Cancelar y Volver</button></Link>
                            <button type="submit" className="btn btn-success" onClick={handleEditarCliente}>Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MainEditarCliente