import '../CSS/MainLogin.css'


const MainLogin = () => {
  return (
    <div className="mainLogin">
      <div className="container p-5">
        <div className="row d-flex justify-content-center">
          <h1 className="text-center tituloMain">KIOSKO LA ESQUINA</h1>
          <h2 className="text-center subTituloMain">Sistema de gestión</h2>
          <div className="col-6 mt-4">
            <div className="row row-cols-1 row-cols-md-2 g-4 d-flex flex-column align-items-center">
              <div className="col-6 login">
                <h3 className="mb-4">Iniciar Sesión</h3>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Usuario:</label>
                    <input type="text" className="form-control" required/>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contraseña:</label>
                    <input type="text" className="form-control" required/>
                  </div>
                  <button type="submit" className="btn btn-primary">Ingresar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLogin
