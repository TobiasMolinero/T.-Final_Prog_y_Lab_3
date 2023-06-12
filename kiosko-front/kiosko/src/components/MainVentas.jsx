import '../CSS/MainVentas.css'

const MainVentas = () => {

  return (
    <div className="container p-4">
      <h1 className="titulo-ventas">Ventas</h1>
      <div className="row">
        <div className="col-9">
          <table className="table mt-4">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nro. Factura</th>
                <th scope="col">Producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Importe</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>
        <div className="col-3 d-flex justify-content-center align-items-center">
          <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="bi bi-plus-circle"></i> Agregar Venta</button>
        </div>
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Agregar Venta</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body modal-body-ventas">
                <form>
                  <div className='mb-3'>
                    <label htmlFor="" className='form-label me-3'>Nro Factura:</label>
                    <input type="text"/>
                  </div>
                  <div className='mb-3'>
                    <select className="form-select" aria-label="Default select example">
                      <option value="0" selected>--Seleccione Producto--</option>
                      <option value="1">Alfajor Aguila</option>
                    </select>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="" className='form-label me-3'>Precio: </label>
                    <input type="text" disabled/>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="" className='form-label me-3'>Cantidad: </label>
                    <input type="number"/>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-success" data-bs-dismiss="modal">Guardar Venta</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainVentas
