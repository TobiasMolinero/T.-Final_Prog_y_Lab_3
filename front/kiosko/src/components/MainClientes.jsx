import '../CSS/MainClientes.css'
import Swal from 'sweetalert2'

const MainClientes = () => {

  const handleGuardarCliente = () => {
    Swal.fire({
      icon: 'success',
      title: 'Guardado',
      text: 'El registro del cliente se guardó con exito.',
      confirmButtonColor: '#a5f063',
      showCloseButton: true,
      timer: 2000,
      timerProgressBar: true,
    })
  }

  // const handleBorrarCliente = () => {
  //   Swal.fire({
  //     icon: 'warning',
  //     text: '¿Esta seguro que quiere borrar este registro?',
  //     showCancelButton: true,
  //     cancelButtonColor: 'grey',
  //     cancelButtonText: 'Cancelar',
  //     confirmButtonText: 'Borrar',
  //     confirmButtonColor: '#FF2E11',
  //     allowOutsideClick: false,
  //     allowEnterKey: false,
  //     allowEscapeKey: false,
  //   }).then((result) => {
  //     if(result.isConfirmed){
  //       Swal.fire({
  //         icon: 'success',
  //         text: 'Se eliminó el registro con exito',
  //         confirmButtonColor: '#a5f063',
  //         timer: 2000,
  //         timerProgressBar: true,
  //         showCloseButton: true, 
  //       })
  //     }
  //   })
  // }

  return (
    <div className='container p-4 main-clientes'>
      <h1 className='titulo-clientes'>Clientes</h1>
      <div className="row">
        <div className="col-9">
          <table className='table mt-4'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Nombre</th>
                <th scope='col'>Apellido</th>
                <th scope='col'>Telefono</th>
                <th scope='col'>Domicilio</th>
                <th scope='col'>Acciones</th>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>
        <div className="col-3">
          <div className="col-12 d-flex justify-content-end mt-4">
            <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdropAgregar"><i className="bi bi-plus-circle me-2"></i>Agregar Cliente</button>
          </div>
        </div>

        {/* MODAL-AGREGAR */}
        <div className="modal fade" id="staticBackdropAgregar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header modal-header-clientes">
                <h2 className="modal-title fs-5" id="staticBackdropLabel">Agregar Cliente</h2>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body modal-body-clientes">
                <form>
                  <div className='mb-3'>
                    <label htmlFor="txtNombre" className='form-label me-3'>Nombre:</label>
                    <input type="text" id="txtNombre"/>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtApellido" className='form-label me-3'>Apellido: </label>
                    <input type="text" id="txtApellido"/>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtTelefono" className='form-label me-3'>Telefono: </label>
                    <input type="text" id='txtTelefono'/>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtDomicilio" className='form-label me-3'>Domicilio: </label>
                    <input type="text" id='txtDomicilio'/>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleGuardarCliente}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
        {/* MODAL-AGREGAR */}

        {/* MODAL-EDITAR */}
        <div className="modal fade" id="staticBackdropEditar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-warning">
                <h2 className="modal-title fs-5" id="staticBackdropLabel">Modificar Cliente</h2>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body modal-body-clientes">
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
                    <label htmlFor="txtTelefonoG" className='form-label me-3'>Telefono: </label>
                    <input type="text" id='txtTelefonoG' />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="txtDomicilioG" className='form-label me-3'>Domicilio: </label>
                    <input type="text" id='txtDomicilioG' />
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
        {/* MODAL-EDITAR */}

      </div>
    </div>
  )
}

export default MainClientes



// Iconos
{/* <i class="bi bi-trash"></i> */}
{/* <i class="bi bi-pencil-square"></i> */}