import '../CSS/MainProductos.css'
import Swal from 'sweetalert2'

const MainProductos = () => {

  const handleGuardarProducto = () => {
    Swal.fire({
      icon: 'success',
      title: 'Guardado',
      text: 'El producto se guardó con exito.',
      confirmButtonColor: '#a5f063',
      showCloseButton: true,
      timer: 2000,
      timerProgressBar: true
    })
  }

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

            </tbody>
          </table>
        </div>
        <div className="col-3">
          <div className="col-12 d-flex justify-content-end mt-4">
            <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="bi bi-plus-circle me-2"></i>Agregar Producto</button>
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
                <form>
                  <div className='mb-3'>
                    <label htmlFor="txtDescripcion" className='form-label me-3'>Descripción:</label>
                    <input type="text" id="txtDescripcion" />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtPrecio" className='form-label me-3'>Precio: </label>
                    <input type="text" id="txtPrecio" />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtCategoria" className='form-label me-3'>Categoria: </label>
                    <input type="text" id='txtCategoria' />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtStock" className='form-label me-3'>Stock: </label>
                    <input type="number" id='txtStock' />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleGuardarProducto}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
        {/* MODAL */}

        {/* MODAL - EDITAR */}
        <div className="modal fade" id="staticBackdropEditar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-warning">
                <h2 className="modal-title fs-5" id="staticBackdropLabel">Modificar Producto</h2>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body modal-body-productos">
                <form>
                  {/* <div className='mb-3'>
                    <label htmlFor="txtDescripcionG" className='form-label me-3'>Descripción:</label>
                    <input type="text" id="txtDescripcionG" />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtPrecioG" className='form-label me-3'>Precio: </label>
                    <input type="text" id="txtPrecioG" />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtCategoriaG" className='form-label me-3'>Categoria: </label>
                    <input type="text" id='txtCategoriaG' />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtStockG" className='form-label me-3'>Stock: </label>
                    <input type="number" id='txtStockG' />
                  </div> */}
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Guardar Cambios</button>
              </div>
            </div>
          </div>
        </div>
        {/* MODAL - EDITAR */}

      </div>
    </div>
  )
}

export default MainProductos


// Iconos
{/* <i class="bi bi-trash"></i> */}
{/* <i class="bi bi-pencil-square"></i> */}