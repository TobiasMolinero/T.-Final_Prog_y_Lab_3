/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Header from "../components/Header"
import Footer from "../components/Footer"
import { ventas, ventas_traerventa_URL, detalle_ventas_traerdetalle_URL } from "../constants/constants"
import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import logo from '../assets/brand-header.png'
import { Table } from "react-bootstrap"
import axios from "axios"

const DetalleVenta = () => {

    const {id} = useParams()

    const [nroFactura, setNroFactura] = useState()
    const [nombreE, setNombreE] = useState()
    const [apellidoE, setApellidoE] = useState()
    const [nombreC, setNombreC] = useState()
    const [apellidoC, setApellidoC] = useState()
    const [total, setTotal] = useState()

    const [detalleVenta, setDetalleVenta] = useState([])

    const getVenta = async() => {
        let response = await axios.get(ventas_traerventa_URL + id)
        setNroFactura(response.data[0].nroFactura)
        setNombreE(response.data[0].nombreE)
        setApellidoE(response.data[0].apellidoE)
        setNombreC(response.data[0].nombreC)
        setApellidoC(response.data[0].apellidoC)
        setTotal(response.data[0].total)
    }

    const getDetalleVenta = async() => {
        let response = await axios.get(detalle_ventas_traerdetalle_URL + id)
        setDetalleVenta(response.data)
    }

    const imprimirTicket = () => {
        window.print()
    }

    useEffect(() => {
        getVenta()
        getDetalleVenta()
    }, [])

    return (
        <>
            <Header />
            <div className="container py-4 main-ventas">
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6 ticket">
                        <div className="d-flex justify-content-center">
                            <img src={logo} alt="" style={{width: 300}}/>
                        </div>
                        <h4 className="text-center mt-4">Ticket Factura</h4>
                        <div className="mt-3 d-flex justify-content-center ticket-info">
                            <ul>
                                <li><p className="me-2">Nro. Factura: <span className="ms-3" style={{fontSize: 23}}>{nroFactura}</span></p></li>
                                <li><p className="me-2">Empleado: <span className="ms-3" style={{fontSize: 23}}>{nombreE}{' '}{apellidoE}</span></p></li>
                                <li><p className="me-2">Cliente: <span className="ms-3" style={{fontSize: 23}}>{nombreC}{' '}{apellidoC}</span></p></li>
                            </ul>
                        </div>
                        <div className="mt-3">
                            <h5 className="text-center mt-1">Detalle</h5>
                            <Table bordered striped className="text-center tabla-ticket">
                                <thead>
                                    <tr>
                                        <td>Descripción</td>
                                        <td>Cantidad</td>
                                        <td>Precio x ud</td>
                                        <td>Total x producto</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detalleVenta.map(det => 
                                        <tr key={det.idDetalleVenta}>
                                            <td>{det.descripcion}</td>
                                            <td>{det.cantidad}</td>
                                            <td>{det.precio}</td>
                                            <td>{det.subTotal}</td>
                                        </tr>
                                        )}
                                </tbody>
                            </Table>
                            <div>
                                <h5 className="pe-5 text-end">Total:.............. <span style={{fontSize: 25}}>${total}</span></h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-3"></div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center mt-3 gap-3">
                        <Link to={ventas}>
                            <button className="btn btn-secondary btnAgregar">Volver a ventas</button>
                        </Link>
                        <button className="btn btn-success btnAgregar" onClick={imprimirTicket}>Imprimir <i className="bi bi-printer"></i></button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default DetalleVenta
