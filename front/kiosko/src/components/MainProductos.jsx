/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import '../CSS/MainProductos.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { productos_URL, productos_eliminar_URL, editarProducto, agregarProducto, categorias } from '../constants/constants'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const MainProductos = () => {

  const [productos, setProductos] = useState([])
  const [stock, setStock] = useState(20)

  const getAllProducts = async() => {
    let response = await axios.get(productos_URL)
    setProductos(response.data)
  }

  const handleDeleteProduct = async(id) => {
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
        axios.put(productos_eliminar_URL + id)
          .then((result) => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'El registro se eliminó con exito.',
              showCloseButton: true,
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false
            })
            getAllProducts()
          }).catch((err) => {
            Swal.fire({
              icon: 'error',
              title: 'ERROR',
              showCloseButton: true,
              text: err,
              confirmButtonColor: '#FF2E11',
            })
          });
      }
    })
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <div className="container p-4 main-productos">
      <h1 className="titulo-productos text-center">Productos</h1>
      <div className="row">
        <div className="col-9">
          <Table striped bordered hover className="table mt-4 text-center">
            <thead>
              <tr>
                <th scope="col">Descripción</th>
                <th scope="col">Categoria</th>
                <th scope="col">Precio</th>
                <th scope="col">Stock</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? <tr><td colSpan={6}><h4>No hay productos registrados</h4></td></tr> : productos.map(producto =>
                <tr key={producto.idProducto}>
                  <td>{producto.descripcion}</td>
                  <td>{producto.nombreCategoria}</td>
                  <td>$ {producto.precio}</td>
                  <td>{producto.stock}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                      <button type="button" className="btn btn-danger" onClick={() => handleDeleteProduct(producto.idProducto)}><i className="bi bi-trash"></i></button>
                      <Link to={editarProducto + producto.idProducto}>
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
          <div className="col-12 d-flex flex-column align-items-start gap-3 my-4">
            <Link to={agregarProducto}>
              <button className="btn btn-success btnAgregar" type="button"><i className="bi bi-plus-circle me-2"></i>Agregar Producto</button>
            </Link>
            <Link to={categorias}>
              <button className='btn btn-secondary btnAgregar'><i className="bi bi-eye me-2"></i>Ver Categorias</button>
            </Link>
          </div>
          {/* <hr />
          <div>
            <h5>Modificar stock</h5>
            <form className='form d-flex flex-column align-items-start mt-3'>
              <div className='d-flex gap-3'>
                <button className='btn btn-secondary control-stock' type='button' onClick={() => setStock(stock - 1)}> - </button>
                <input className='txtStock text-center' value={stock} type="number" onChange={(e) => {setStock(e.target.value)}} min={0} disabled/>
                <button className='btn btn-secondary control-stock' type='button' onClick={() => setStock(stock + 1)}> + </button>
              </div>
              <div className='d-flex justify-content-center gap-2'>
                <button type='submit' className='btn btn-success mt-3'>Aceptar</button>
                <button type='button' className='btn btn-secondary mt-3'>Cancelar</button>
              </div>
            </form>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default MainProductos


// Iconos
{/* <i class="bi bi-trash"></i> */ }
{/* <i class="bi bi-pencil-square"></i> */ }