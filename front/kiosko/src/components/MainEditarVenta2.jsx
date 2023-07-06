/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link, useNavigate, useParams } from "react-router-dom"
import { ventas, ventas_seleccionarventa_URL, ventas_editar_URL, detalle_ventas_temp_URL, detalle_ventas_crearT_URL, detalle_ventas_eliminarT_URL, detalle_ventas_total_URL, detalle_ventas_creartablaTemp_URL , productos_URL, empleados_URL, clientes_URL } from "../constants/constants"
import { Table } from "react-bootstrap"
import { useState, useEffect } from "react"
import axios from "axios"
import Swal from 'sweetalert2'

const MainEditarVenta2 = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    const [productos, setProductos] = useState([])
    const [empleados, setEmpleados] = useState([])
    const [clientes, setClientes] = useState([])
    const [detalles, setDetalles] = useState([])

    const [nroFactura, setNroFactura] = useState()
    const [idEmpleado, setIdEmpleado] = useState()
    const [idCliente, setIdCliente] = useState()
    const [total, setTotal] = useState(0)

    const [idProducto, setIdProducto] = useState(undefined)
    const [precio, setPrecio] = useState(0)
    const [cantidad, setCantidad] = useState(0)
    const [subTotal, setSubTotal] = useState(0)

    const getVenta = async() => {
        let response = await axios.get(ventas_seleccionarventa_URL + id)
        setNroFactura(response.data[0].nroFactura)
        setIdEmpleado(response.data[0].idEmpleado)
        setIdCliente(response.data[0].idCliente)
    }

    const crearTablaDetalleTemp = async() => {
        let response = await axios.get(detalle_ventas_creartablaTemp_URL  + id)
        setDetalles(response.data)
        getTotal()
    }

    const getAllProductos = async () => {
        let response = await axios.get(productos_URL)
        setProductos(response.data)
    }

    const getAllEmpleados = async () => {
        let response = await axios.get(empleados_URL)
        setEmpleados(response.data)
    }

    const getAllClientes = async () => {
        let response = await axios.get(clientes_URL)
        setClientes(response.data)
    }

    const getDetalleTemp = async () => {
        let response = await axios.get(detalle_ventas_temp_URL)
        setDetalles(response.data)
    }


    const agregarItemDetalle = async () => {
        await axios.post(detalle_ventas_crearT_URL, {
            idVenta: id,
            idProducto: idProducto,
            cantidad: cantidad,
            precio: precio,
        })
            .then((result) => {
                setTotal(+total + +subTotal)
                setIdProducto('selected')
                setCantidad(0)
                setPrecio(0)
                setSubTotal(0)
                getDetalleTemp()
            }).catch((err) => {

            });
    }

    const eliminarItemDetalle = async (id) => {
        await axios.delete(detalle_ventas_eliminarT_URL + id)
            .then((result) => {
                getDetalleTemp()
                getTotal()
            }).catch((err) => {

            });
    }

    const modificarVenta = async() => {
        await axios.put(ventas_editar_URL + id, {
            nroFactura: nroFactura,
            idEmpleado: idEmpleado,
            idCliente: idCliente,
            total: total
        })
        .then((result) => {
            Swal.fire({
                icon: 'success',
                title: '¡Venta registrada!',
                text: 'La venta se registró con exito',
                showCloseButton: false,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            })
            setTimeout(() => {
                navigate(ventas)
            }, 2015)
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

    const getPrecio = async () => {
        if (idProducto === undefined || idProducto === 0 || idProducto === 'selected') {
            setPrecio(0)
        } else {
            let producto = productos.filter(producto => producto.idProducto === +idProducto)
            setPrecio(producto[0].precio)
        }
    }

    const calcularSubTotal = () => {
        setSubTotal(precio * cantidad)
    }

    const getTotal = async () => {
        let response = await axios.get(detalle_ventas_total_URL)
        setTotal(response.data[0].total)
    }

    useEffect(() => {
        getVenta()
        crearTablaDetalleTemp()
        getAllProductos()
        getAllEmpleados()
        getAllClientes()
    }, [])

    useEffect(() => {
        getPrecio()
    }, [idProducto])

    useEffect(() => {
        calcularSubTotal()
    }, [cantidad])


    return (
        <div className="container p-4 main-ventas">
            <h1 className="titulo-ventas text-center">Editar Venta</h1>
            <div className="row p-4 mt-3">
                <div className="col-6 d-flex flex-column align-items-end border-end pe-5">
                    <div>
                        <h2>Info Venta</h2>
                        <div className="mt-3">
                            <label htmlFor="" className="me-2">Nro. Factura:</label>
                            <input type="number" min="1" max="9999" value={nroFactura} onChange={(e) => { setNroFactura(e.target.value) }} disabled/>
                        </div>
                        <div className="mt-3">
                            <select className="form-select" value={idEmpleado} onChange={(e) => { setIdEmpleado(e.target.value) }}>
                                {/* <option value="selected">-- Empleado --</option> */}
                                {empleados.map(empleado =>
                                    <option key={empleado.idEmpleado} value={empleado.idEmpleado}>{empleado.nombreE}{' '}{empleado.apellidoE}</option>
                                )}
                            </select>
                        </div>
                        <div className="mt-3">
                            <select className="form-select" value={idCliente} onChange={(e) => { setIdCliente(e.target.value) }}>
                                {/* <option value="selected">-- Cliente --</option> */}
                                {clientes.map(cliente =>
                                    <option key={cliente.idCliente} value={cliente.idCliente}>{cliente.nombreC}{' '}{cliente.apellidoC}</option>
                                )}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-6 d-flex flex-column align-items-start border-start ps-5">
                    <h2>Detalles de la venta</h2>
                    <div className="mt-3">
                        <select className="form-select" defaultValue="selected" onChange={(e) => { setIdProducto(e.target.value) }}>
                            <option value="selected">-- Seleccionar Producto --</option>
                            {productos.map(producto =>
                                <option key={producto.idProducto} value={producto.idProducto}>{producto.descripcion}</option>
                            )}
                        </select>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="" className="me-2">Cantidad: </label>
                        <input type="number" min="1" value={cantidad} onChange={(e) => { setCantidad(e.target.value) }} disabled={idProducto === 'selected' || idProducto === undefined ? true : false} />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="" className="me-2">Precio:</label>
                        <input type="number" value={precio} disabled onChange={(e) => { setPrecio(e.target.value) }} />
                    </div>
                    <div>
                        <button className="btn btn-primary mt-3 btnAgregar" onClick={agregarItemDetalle} disabled={cantidad === 0 || idProducto === undefined || idProducto === 'selected' ? true : false}>Agregar Producto</button>
                    </div>
                    <div className="mt-4">
                        <Table hover bordered striped className="text-center">
                            <thead>
                                <tr>
                                    <th>Descripcion</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Sub Total</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detalles.length === 0 ?
                                    <tr>
                                        <td colSpan={5}><h6 className="text-center">No se agregaron productos</h6></td>
                                    </tr>
                                    : detalles.map(detalle =>
                                        <tr key={detalle.idDetalleVenta}>
                                            <td>{detalle.descripcion}</td>
                                            <td>{detalle.cantidad}</td>
                                            <td>{detalle.precio}</td>
                                            <td>{detalle.subTotal}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => eliminarItemDetalle(detalle.idDetalleVenta)}><i className="bi bi-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                        <div>
                            <h5 className="text-end me-5 pe-5">Total: $ <span>{detalles.length === 0 ? '0' : total}</span></h5>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center gap-2 mt-3">
                    <Link to={ventas}><button className="btn btn-secondary btnAgregar">Cancelar y volver</button></Link>
                    <button className="btn btn-success btnAgregar" onClick={modificarVenta}>Modificar</button> 
                </div>
            </div>
        </div>
    )
}

export default MainEditarVenta2
