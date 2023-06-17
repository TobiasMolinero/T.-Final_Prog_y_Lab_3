/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import axios from "axios"
import { categoriasProductos_URL, productos, productos_URL} from "../constants/constants"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const MainAgregarProducto = () => {

  const [categoriasProductos, setCategoriasProductos] = useState([])
  const navigate = useNavigate()

  const getCategoriesProducts = async () => {
    let response = await axios.get(categoriasProductos_URL)
    setCategoriasProductos(response.data)
    // console.log(response.data)
  }

  const guardarProducto = async() => {
    await axios.post(productos_URL)
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'El producto se guardó con exito.',
        confirmButtonColor: '#a5f063',
        showCloseButton: true,
        timer: 2000,
        timerProgressBar: true
      })
      navigate(productos)
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Upss...',
        text: 'Ocurrió un error al guardar.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#a5f063',
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
      })
    })
  }

  const handleNavegarProductos = () => {
    Swal.fire({
      icon: 'question',
      text: '¿Seguro que desea cancelar?',
      showDenyButton: true,
      denyButtonText: 'No',
      denyButtonColor: 'grey',
      confirmButtonText: 'Si',
      confirmButtonColor: '#a5f063',
    }).then((result) => {
      if(result.isConfirmed){
        navigate(productos)
      }
    })
  }

  useEffect(() => {
    getCategoriesProducts()
  }, [])

  return (
    <div className="container p-4">
      <div className="row">
        <h1 className="text-center mb-5">Agregar nuevo producto</h1>
        <div className="col-12 d-flex flex-column justify-content-center align-items-center">
          <form onSubmit={guardarProducto} className="mb-3">
            <div className='mb-3'>
              <label htmlFor="txtDescripcion" className='form-label me-3'>Descripción:</label>
              <input type="text" id="txtDescripcion" required />
            </div>
            <div className='mb-3'>
              <label htmlFor="txtPrecio" className='form-label me-3'>Precio: </label>
              <input type="text" id="txtPrecio" required />
            </div>
            <div className='mb-3'>
              <select className="form-select" aria-label="Default select example" defaultValue="selected">
                <option value="selected" >--Seleccione Categoria--</option>
                {categoriasProductos.map(categoria =>
                  <option key={categoria.idCategoriaP} value={categoria.idCategoriaP}>{categoria.nombre}</option>
                )}
              </select>
            </div>
            <div className='mb-3'>
              <label htmlFor="txtStock" className='form-label me-3'>Stock: </label>
              <input type="number" id='txtStock' required />
            </div>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-success" type="submit">Guardar Producto</button>
            </div>
          </form>
          <button className="btn btn-secondary" onClick={handleNavegarProductos}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

export default MainAgregarProducto
