/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import { ventas, ventas_URL, ventas_editar_URL, empleados_URL, clientes_URL, productos_URL } from "../constants/constants"
import axios from 'axios'
import Swal from "sweetalert2"

const MainEditarVenta = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [empleados, setEmpleados] = useState([])
    const [clientes, setClientes] = useState([])
    const [productos, setProductos] = useState([])

    const formEditar = document.getElementById('formEditar')

    const [nroFactura, setNroFactura] = useState()
    const [idEmpleado, setIdEmpleado] = useState()
    const [idCliente, setIdCliente] = useState()
    const [idProducto, setIdProducto] = useState()
    const [fecha, setFecha] = useState()
    const [cantidad, setCantidad] = useState()
    const [total, setTotal] = useState()
    const [firstClick, setFirstClick] = useState(true)

    const getVenta = async () => {
        let response = await axios.get(ventas_URL + id)
        setNroFactura(response.data[0].nroFactura)
        setIdEmpleado(response.data[0].idEmpleado)
        setIdCliente(response.data[0].idCliente)
        setIdProducto(response.data[0].idProducto)
        setFecha((response.data[0].fecha).substring(0, 10))
        setCantidad(response.data[0].cantidad)
        setTotal(response.data[0].total)
    }

    const getAllEmpleados = async () => {
        let response = await axios.get(empleados_URL)
        setEmpleados(response.data)
    }

    const getAllClientes = async () => {
        let response = await axios.get(clientes_URL)
        setClientes(response.data)
    }

    const getAllProductos = async () => {
        let response = await axios.get(productos_URL)
        setProductos(response.data)
    }

    const handleEditVenta = async (e) => {
        e.preventDefault()
        await axios.put(ventas_editar_URL + id, {
            nroFactura: nroFactura,
            idEmpleado: idEmpleado,
            idCliente: idCliente,
            idProducto: idProducto,
            fecha: fecha,
            cantidad: cantidad,
            total: total,
            estado: 1
        })
            .then((result) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Guardado',
                    text: 'La venta se modificó con exito, Volviendo a ventas.',
                    showConfirmButton: false,
                    timer: 1800,
                    timerProgressBar: true,
                })
                setTimeout(() => {
                    navigate(ventas)
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

    const calcularTotal = () => {
        if(cantidad !== undefined){
            let producto = productos.filter(p => p.idProducto === +idProducto)
            setTotal(producto[0].precio * cantidad)
        }
    }

    const disabledInputCant = (e) => {
        if(e.keyCode === 109 || e.keyCode === 110 || e.keyCode === 189 || e.keyCode === 107 || e.keyCode === 187 || e.keyCode === 188 || e.keyCode === 69 || e.keyCode === 190) {
            e.preventDefault()
        }
    }

    useEffect(() => {
        getAllEmpleados()
        getAllClientes()
        getAllProductos()
        setTimeout(() => {
            getVenta()
        }, 220);
    }, [])

    return (
        <div className="container p-4 main-ventas">
            <div className="row justify-content-center">
                <h1 className="titulo-ventas text-center">Editar Venta</h1>
                <div className="col-8 d-flex flex-column align-items-center mt-4 bg-warning formE">
                    <form id="formEditar" className="mt-3" onSubmit={handleEditVenta}>
                        <div className='mb-3'>
                            <label htmlFor="txtNroFactura" className='form-label me-3'>Nro. Factura:</label>
                            <input type="text" id="txtNroFactura" value={nroFactura} onChange={(e) => { setNroFactura(e.target.value) }} required/>
                        </div>
                        <div className='mb-3'>
                            <select className="form-select" value={idEmpleado} onChange={(e) => { setIdEmpleado(e.target.value) }}>
                                {empleados.map(empleado =>
                                    <option key={empleado.idEmpleado} value={empleado.idEmpleado}>{empleado.nombreE}{' '}{empleado.apellidoE}</option>
                                )}
                            </select>
                        </div>
                        <div className='mb-3'>
                            <select className="form-select" value={idCliente} onChange={(e) => { setIdCliente(e.target.value) }}>
                                {clientes.map(cliente =>
                                    <option key={cliente.idCliente} value={cliente.idCliente}>{cliente.nombreC}{' '}{cliente.apellidoC}</option>
                                )}
                            </select>
                        </div>
                        <div className='mb-3'>
                            <select className="form-select" value={idProducto} onChange={(e) => { setIdProducto(e.target.value) }} onClickCapture={calcularTotal}>
                                {productos.map(producto =>
                                    <option key={producto.idProducto} value={producto.idProducto}>{producto.descripcion}</option>
                                )}
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="txtFecha" className='form-label me-3'>Fecha: </label>
                            <input type="date" id="txtFecha" value={fecha} onChange={(e) => { setFecha(e.target.value) }} required/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="txtCantidad" className='form-label me-3'>Cantidad: </label>
                            <input type="number" id='txtCantidad' value={cantidad} onKeyDown={disabledInputCant} onKeyUp={calcularTotal} onClick={calcularTotal} onChange={(e) => { setCantidad(e.target.value) }} min={0} required/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="txtPrecio" className='form-label me-3'>Total: </label>
                            <input type="text" id="txtPrecio" value={total} onChange={(e) => { setTotal(e.target.value) }} min={0} step={0.01} disabled required/>
                        </div>
                        <div className="mb-3 d-flex justify-content-center gap-3">
                            <Link to={ventas} onClick={() => { formEditar.reset() }}><button className="btn btn-secondary">Cancelar y Volver</button></Link>
                            <button type="submit" className="btn btn-success">Modificar</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default MainEditarVenta
