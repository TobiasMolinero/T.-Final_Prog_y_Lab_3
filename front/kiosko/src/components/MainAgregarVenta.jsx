/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import '../CSS/MainVentas.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { ventas, ventas_crear_URL, productos_URL, empleados_URL, clientes_URL } from '../constants/constants'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const MainAgregarVenta = () => {

    const navigate = useNavigate()

    const [empleados, setEmpleados] = useState([])
    const [clientes, setClientes] = useState([])
    const [productos, setProductos] = useState([])

    const formAgregar = document.getElementById('formAgregar')
    const selectE = document.getElementById('selectE')
    const selectC = document.getElementById('selectC')
    const selectP = document.getElementById('selectP')

    const [nroFactura, setNroFactura] = useState()
    const [idEmpleado, setIdEmpleado] = useState()
    const [idCliente, setIdCliente] = useState()
    const [idProducto, setIdProducto] = useState()
    const [fecha, setFecha] = useState()
    const [cantidad, setCantidad] = useState()
    const [total, setTotal] = useState()
    
  const getAllEmpleados = async() => {
    let response = await axios.get(empleados_URL)
    setEmpleados(response.data)
  }

  const getAllClientes = async() => {
    let response = await axios.get(clientes_URL)
    setClientes(response.data)
  }

  const getAllProductos = async() => {
    let response = await axios.get(productos_URL)
    setProductos(response.data)
  }

  const handleGuardarVenta = async(e) => {
    e.preventDefault()
    if(selectE.value === "selected" || selectC.value === "selected" || selectP.value === "selected" || selectE.value === '' || selectC.value === '' || selectP.value === ''){
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'Debe seleccionar un empleado, un cliente y un producto.',
        confirmButtonColor: '#a5f063',
        confirmButtonText: 'Aceptar',
        timer: 2000,
        timerProgressBar: true
      })
    } else {
      await axios.post(ventas_crear_URL, {
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
          text: 'La venta se guardó con exito.',
          showConfirmButton: true,
          confirmButtonColor: '#a5f063',
          confirmButtonText: 'Aceptar',
          showCloseButton: false,
          allowEscapeKey: false,
          allowOutsideClick: false,
          allowEnterKey: false,
        }).then((result) => {
          if(result.isConfirmed){
            formAgregar.reset()
            setTotal(undefined)
            Swal.fire({
              icon: 'question',
              text: '¿Desea registrar otra venta?',
              showCloseButton: false,
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#a5f063',
              showCancelButton: true,
              cancelButtonText: 'cancelar',
              cancelButtonColor: 'grey',
              allowEscapeKey: false,
              allowOutsideClick: false,
              allowEnterKey: false,
            }).then((result) => {
              if(result.isDismissed){
                navigate(ventas)
              } else {
                Swal.close
              }
            })
          }
        })
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

  const calcularTotal = (e) => {
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
  }, [])

    return (
        <div className="container p-4 main-ventas">
            <div className="row justify-content-center">
                <h1 className="titulo-ventas text-center">Agregar Venta</h1>
                <div className="col-8 d-flex flex-column align-items-center mt-4 formA">
                    <form id="formAgregar" onSubmit={handleGuardarVenta}>
                        <div className='mb-3'>
                            <label htmlFor="txtNroFactura" className='form-label me-3'>Nro. Factura:</label>
                            <input type="text" id="txtNroFactura" onChange={(e) => { setNroFactura(e.target.value) }} required />
                        </div>
                        <div className='mb-3'>
                            <select className="form-select" id='selectE' aria-label="Default select example" defaultValue="selected" onChange={(e) => { setIdEmpleado(e.target.value) }} required>
                                <option value="selected" >--Seleccione Empleado--</option>
                                {empleados.map(empleado =>
                                    <option key={empleado.idEmpleado} value={empleado.idEmpleado}>{empleado.nombreE}{' '}{empleado.apellidoE}</option>
                                )}
                            </select>
                        </div>
                        <div className='mb-3'>
                            <select className="form-select" id='selectC' aria-label="Default select example" defaultValue="selected" onChange={(e) => { setIdCliente(e.target.value) }} required >
                                <option value="selected" >--Seleccione Cliente--</option>
                                {clientes.map(cliente =>
                                    <option key={cliente.idCliente} value={cliente.idCliente}>{cliente.nombreC}{' '}{cliente.apellidoC}</option>
                                )}
                            </select>
                        </div>
                        <div className='mb-3'>
                            <select className="form-select" id='selectP' defaultValue="selected" onChange={(e) => { setIdProducto(e.target.value) }} required>
                                <option value="selected" >--Seleccione Producto--</option>
                                {productos.map(producto =>
                                    <option key={producto.idProducto} value={producto.idProducto}>{producto.descripcion}</option>
                                )}
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="txtFecha" className='form-label me-3'>Fecha: </label>
                            <input type="date" id="txtFecha" onChange={(e) => { setFecha(e.target.value) }} required />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="txtCantidad" className='form-label me-3'>Cantidad: </label>
                            <input type="number" id='txtCantidad' onKeyDown={disabledInputCant} onKeyUp={calcularTotal} onClick={calcularTotal} onChange={(e) => { setCantidad(e.target.value) }} min={0} required disabled={idProducto === undefined || idProducto === 'selected' ? true : false}/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="txtPrecio" className='form-label me-3'>Total: </label>
                            <input type="number" id="txtPrecio" defaultValue={total} onChange={(e) => { setTotal(e.target.value) }}min={0} step={0.01} disabled required/>
                        </div>
                        <div className="mb-3 d-flex justify-content-center gap-3">
                            <Link to={ventas} onClick={() => { formAgregar.reset() }}><button className="btn btn-secondary" type='button'>Cancelar y Volver</button></Link>
                            <button type="submit" className="btn btn-success">Guardar</button>
                        </div>            
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MainAgregarVenta
