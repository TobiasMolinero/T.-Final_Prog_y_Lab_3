/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import '../CSS/MainProductos.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { productos_URL, categoriasProductos_URL, editarProducto } from '../constants/constants'
import { Link } from 'react-router-dom'

const MainProductos = () => {

  const [productos, setProductos] = useState([])
  const [categoriasProductos, setCategoriaProductos] = useState([])

  const [descripcion, setDescripcion] = useState()
  const [precio, setPrecio] = useState()
  const [stock, setStock] = useState()
  const [categoria, setCategoria] = useState()

  const formAgregar = document.getElementById('formAgregar')

  const getAllProducts = async() => {
    let response = await axios.get(productos_URL)
    setProductos(response.data)
  }

  const getCategoriesProducts = async() => {
    let response = await axios.get(categoriasProductos_URL)
    setCategoriaProductos(response.data)
  }

  const handleSaveProduct = async(e) => {
    e.preventDefault()
    await axios.post(productos_URL, {
      descripcion: descripcion,
      precio: precio,
      stock: stock,
      idCategoria: categoria
    })
    .then((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'El registro del nuevo producto se guardó con exito.',
        confirmButtonColor: '#a5f063',
        showCloseButton: true,
        timer: 2000,
        timerProgressBar: true
      })
      getAllProducts()
      formAgregar.reset()
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

  const handleDeleteProduct = async(id) => {
    Swal.fire({
      icon: 'question',
      text: '¿Está seguro que desea eliminar este producto?',
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      denyButtonColor: 'grey',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#a5f063',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(productos_URL + id)
          .then((result) => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'El registro se eliminó con exito.',
              confirmButtonColor: '#a5f063',
              showCloseButton: true,
              timer: 2000,
              timerProgressBar: true
            })
            getAllProducts()
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
    })
  }

  useEffect(() => {
    getCategoriesProducts()
    setTimeout(() => {
      getAllProducts()
    }, 100)
  }, [])

  return (
    <div className="container p-4 main-productos">
      <h1 className="titulo-productos">Productos</h1>
      <div className="row">
        <div className="col-9">
          <table className="table mt-4 text-center">
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
                  <td>{categoriasProductos[producto.idCategoria - 1].nombre}</td>
                  <td>{producto.precio}</td>
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
          </table>
        </div>
        <div className="col-3">
          <div className="col-12 d-flex justify-content-end mt-4">
            <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="bi bi-plus-circle me-2"></i>Agregar Producto</button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header modal-header-productos">
              <h2 className="modal-title fs-5" id="staticBackdropLabel">Agregar Producto</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body modal-body-productos">
              <form id="formAgregar" onSubmit={handleSaveProduct}>
                <div className='mb-3'>
                  <label htmlFor="txtDescripcion" className='form-label me-3'>Descripción:</label>
                  <input type="text" id="txtDescripcion" onChange={(e) => { setDescripcion(e.target.value) }} autoComplete='off' required />
                </div>
                <div className='mb-3'>
                  <label htmlFor="txtPrecio" className='form-label me-3'>Precio: </label>
                  <input type="text" id="txtPrecio" onChange={(e) => { setPrecio(e.target.value) }} autoComplete='off' required />
                </div>
                <div className="mb-3">
                  <label htmlFor="txtStock" className='form-label me-3'>Stock: </label>
                  <input type="number" id='txtStock' onChange={(e) => { setStock(e.target.value) }} autoComplete='off' required />
                </div>
                <div className='mb-3'>
                  <select className="form-select" id="cbCategoria" aria-label="Default select example" defaultValue='selected' onChange={(e) => { setCategoria(e.target.value) }} required>
                    <option value="selected">-- SELECCIONE CATEGORIA --</option>
                    {categoriasProductos.map(categoria =>
                      <option key={categoria.idCategoriaP} value={categoria.idCategoriaP}>{categoria.nombre}</option>
                    )}
                  </select>
                </div>
                <div className="mb-3 d-flex justify-content-center gap-2">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL AGREGAR */}

      {/* MODAL - EDITAR*/}
      {/* <div className="modal fade" id="staticBackdropEditar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-warning">
              <h2 className="modal-title fs-5" id="staticBackdropLabel">Modificar Producto</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body modal-body-productos">
              <form>
                {}
                <div className='mb-3'>
                  <label htmlFor="txtDescripcionE" className='form-label me-3'>Descripción:</label>
                  <input type="text" id="txtDescripcionE" onChange={(e) => { setDescripcion(e.target.value) }} autoComplete='off' required />
                </div>
                <div className='mb-3'>
                  <label htmlFor="txtPrecioE" className='form-label me-3'>Precio: </label>
                  <input type="text" id="txtPrecioE" onChange={(e) => { setPrecio(e.target.value) }} autoComplete='off' required />
                </div>
                <div className="mb-3">
                  <label htmlFor="txtStockE" className='form-label me-3'>Stock: </label>
                  <input type="number" id='txtStockE' onChange={(e) => { setStock(e.target.value) }} autoComplete='off' required />
                </div>
                <div className='mb-3'>
                  <select className="form-select" id="cbCategoriaE" aria-label="Default select example" defaultValue='selected' onChange={(e) => { setCategoria(e.target.value) }} required>
                    <option value="selected">-- SELECCIONE LA CATEGORIA --</option>
                    {categoriasProductos.map(categoria =>
                      <option key={categoria.idCategoriaP} value={categoria.idCategoriaP}>{categoria.nombre}</option>
                    )}
                  </select>
                </div>
                <div className="mb-3 d-flex justify-content-center gap-2">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
      {/* MODAL - EDITAR */}
    </div>
  )
}

export default MainProductos


// Iconos
{/* <i class="bi bi-trash"></i> */ }
{/* <i class="bi bi-pencil-square"></i> */ }