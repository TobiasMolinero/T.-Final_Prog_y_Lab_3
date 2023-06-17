/* eslint-disable no-unused-vars */
import '../CSS/MainProductos.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { productos_URL, categoriasProductos_URL, agregarProducto } from '../constants/constants'
import { useNavigate } from 'react-router-dom'

const MainProductos = () => { 
  
  const [productos, setProductos] = useState([])
  const [categoriasProductos, setCategoriaProductos] = useState([])

  const navigate = useNavigate()
  const handleNavegarGuardar = () => {
    navigate(agregarProducto)
  }

  const getAllProducts = async() => {
    let response = await axios.get(productos_URL)
    setProductos(response.data) 
  }

  const getCategoriesProducts = async(id) => {
    let response = await axios.get(categoriasProductos_URL)
    setCategoriaProductos(response.data)
  }

  useEffect(()=>{
    getCategoriesProducts()
    getAllProducts()
  },[])

  return (
    <div className="container p-4 main-productos">
      <h1 className="titulo-productos">Productos</h1>
      <div className="row">
        <div className="col-9">
          <table className="table mt-4">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Descripción</th>
                <th scope="col">Categoria</th>
                <th scope="col">Precio</th>
                <th scope="col">Stock</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(producto => 
                <tr key={producto.idProducto}>
                  <td>{producto.idProducto}</td>
                  <td>{producto.descripcion}</td>
                  {/* <td>{producto.idCategoria}</td> */}
                  <td>{categoriasProductos[producto.idCategoria-1].nombre}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.stock}</td>
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
            <button className="btn btn-success" type="button" onClick={handleNavegarGuardar}><i className="bi bi-plus-circle me-2"></i>Agregar Producto</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainProductos


// Iconos
{/* <i class="bi bi-trash"></i> */}
{/* <i class="bi bi-pencil-square"></i> */}