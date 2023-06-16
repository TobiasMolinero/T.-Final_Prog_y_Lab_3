import '../CSS/MainVentas.css'
import Swal from 'sweetalert2'

const MainVentas = () => {

  let productos = [{id: 1, nombre: "Alfajor Aguila", precio: 300}]

  const handleGuardarVenta = () => {
    Swal.fire({
      icon: 'success',
      title: 'Guardado',
      text: 'La venta se guardó con exito.',
      confirmButtonColor: '#a5f063',
      showCloseButton: true,
      timer: 2000,
      timerProgressBar: true
    })
  }

  return (
    <div className="container p-4 mb-5 main-ventas">
      <h1 className="titulo-ventas">Ventas</h1>
      <div className="row">
        
        {/* BOTON AGREGAR VENTA: Abre un modal donde se cargan los datos que se van a agregar. */}
        <div className="col-12 d-flex justify-content-end mt-4">
          <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="bi bi-plus-circle me-2"></i>Agregar Venta</button>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-12">
          <table className="table mt-4">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nro. Factura</th>
                <th scope="col">Empleado</th>
                <th scope="col">Cliente</th>
                <th scope="col">Producto</th>
                <th scope="col">Fecha</th>
                <th scope="col">Forma de pago</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Importe</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>
        </div>

        {/* MODAL AGREGAR */}
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header modal-header-ventas">
                <h2 className="modal-title fs-5" id="staticBackdropLabel">Agregar Venta</h2>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body modal-body-ventas">
                <form>
                  <div className='mb-3'>
                    <label htmlFor="txtNroFactura" className='form-label me-3'>Nro Factura:</label>
                    <input type="text" id="txtNroFactura"/>
                  </div>
                  <div className='mb-3'>
                    <select className="form-select" aria-label="Default select example" defaultValue="selected">
                      <option value="selected" >--Seleccione Empleado--</option>
                    </select>
                  </div>
                  <div className='mb-3'>
                    <select className="form-select" aria-label="Default select example" defaultValue="selected">
                      <option value="selected" >--Seleccione Cliente--</option>
                    </select>
                  </div>
                  <div className='mb-3'>
                    <select className="form-select" aria-label="Default select example" defaultValue="selected">
                      <option value="selected" >--Seleccione Producto--</option>
                      {productos.map(producto => 
                        <option key={producto.id} value={producto.id}>{producto.nombre}</option>
                      )}
                    </select>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtFecha" className='form-label me-3'>Fecha: </label>
                    <input type="date" id="txtFecha"/>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtPrecio" className='form-label me-3'>Precio: </label>
                    <input type="text" id="txtPrecio" disabled/>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtCantidad" className='form-label me-3'>Cantidad: </label>
                    <input type="number" id='txtCantidad'/>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtFormaPago" className='form-label me-3'>Forma de pago: </label>
                    <input type="text" id='txtFormaPago'/>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleGuardarVenta}>Guardar</button>
              </div>
            </div>
          </div>
        </div> 
        {/* MODAL AGREGAR */}

        {/* MODAL EDITAR */}
        <div className="modal fade" id="staticBackdropEditar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-warning">
                <h2 className="modal-title fs-5" id="staticBackdropLabel">Modificar Venta</h2>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body modal-body-ventas">
                <form>
                  {/* <div className='mb-3'>
                    <label htmlFor="txtNroFacturaG" className='form-label me-3'>Nro Factura:</label>
                    <input type="text" id="txtNroFacturaG"/>
                  </div>
                  <div className='mb-3'>
                    <select className="form-select" aria-label="Default select example" defaultValue="selected">
                      <option value="selected" >--Seleccione Empleado--</option>
                    </select>
                  </div>
                  <div className='mb-3'>
                    <select className="form-select" aria-label="Default select example" defaultValue="selected">
                      <option value="selected" >--Seleccione Cliente--</option>
                    </select>
                  </div>
                  <div className='mb-3'>
                    <select className="form-select" aria-label="Default select example" defaultValue="selected">
                      <option value="selected" >--Seleccione Producto--</option>
                      {productos.map(producto => 
                        <option key={producto.id} value={producto.id}>{producto.nombre}</option>
                      )}
                    </select>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtFechaG" className='form-label me-3'>Fecha: </label>
                    <input type="date" id="txtFechaG"/>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtPrecioG" className='form-label me-3'>Precio: </label>
                    <input type="text" id="txtPrecioG" disabled/>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtCantidadG" className='form-label me-3'>Cantidad: </label>
                    <input type="number" id='txtCantidadG'/>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtFormaPagoG" className='form-label me-3'>Forma de pago: </label>
                    <input type="text" id='txtFormaPagoG'/>
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
        {/* MODAL EDITAR */}

      </div>
    </div>
  )
}

export default MainVentas

// Iconos
{/* <i class="bi bi-trash"></i> */}
{/* <i class="bi bi-pencil-square"></i> */}