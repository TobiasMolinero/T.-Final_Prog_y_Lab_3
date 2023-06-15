import '../CSS/MainEmpleados.css'

const MainEmpleados = () => {
  return (
    <div className='container p-4 main-empleados'>
      <h1 className='titulo-empleados'>Empleados</h1>
      <div className="row">
        <div className="col-9">
          <table className='table mt-4'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Nombre</th>
                <th scope='col'>Apellido</th>
                <th scope='col'>Turno</th>
                <th scope='col'>Sueldo</th>
                <th scope='col'>Acciones</th>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>
        <div className="col-3">
          <div className="col-12 d-flex justify-content-end mt-4">
            <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="bi bi-plus-circle me-2"></i>Agregar Empleado</button>
          </div>
        </div>

        {/* MODAL */}
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header modal-header-empleados">
                <h2 className="modal-title fs-5" id="staticBackdropLabel">Agregar Empleado</h2>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body modal-body-empleados">
                <form>
                  <div className='mb-3'>
                    <label htmlFor="txtNombre" className='form-label me-3'>Nombre:</label>
                    <input type="text" id="txtNombre" />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtApellido" className='form-label me-3'>Apellido: </label>
                    <input type="text" id="txtApellido" />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtTurno" className='form-label me-3'>Turno: </label>
                    <input type="text" id='txtTurno' />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtSueldo" className='form-label me-3'>Sueldo: </label>
                    <input type="text" id='txtSueldo' />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-success" data-bs-dismiss="modal">Guardar</button>
              </div>
            </div>
          </div>
        </div>
        {/* MODAL - AGREGAR */}

        {/* MODAL - EDITAR*/}
        <div className="modal fade" id="staticBackdropEditar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-warning">
                <h2 className="modal-title fs-5" id="staticBackdropLabel">Modificar Empleado</h2>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body modal-body-empleados">
                <form>
                  {/* <div className='mb-3'>
                    <label htmlFor="txtNombreG" className='form-label me-3'>Nombre:</label>
                    <input type="text" id="txtNombreG" />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtApellidoG" className='form-label me-3'>Apellido: </label>
                    <input type="text" id="txtApellidoG" />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtTurnoG" className='form-label me-3'>Turno: </label>
                    <input type="text" id='txtTurnoG' />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtSueldoG" className='form-label me-3'>Sueldo: </label>
                    <input type="text" id='txtSueldoG' />
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

export default MainEmpleados


// Iconos
{/* <i class="bi bi-trash"></i> */}
{/* <i class="bi bi-pencil-square"></i> */}