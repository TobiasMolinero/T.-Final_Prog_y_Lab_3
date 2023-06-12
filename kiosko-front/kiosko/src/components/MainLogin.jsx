import { useNavigate } from 'react-router-dom'
import '../CSS/MainLogin.css'


const MainLogin = () => {

  const navigate = useNavigate()

  const ingresar = (e) => {
    e.preventDefault()
    navigate('/home')
  }


  return (
    <div className="mainLogin">
      <div className="container p-5">
        <div className="row d-flex justify-content-center">
          <h1 className="text-center tituloMain">KIOSKO LA ESQUINA</h1>
          <h2 className="text-center subTituloMain">Sistema de gestión</h2>
          <div className="col-6 mt-3 p-4 login">
            <h3 className="mb-4">Iniciar Sesión</h3>
            <form onSubmit={ingresar}>
              <div className="mb-3">
                <label className="form-label">Usuario:</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña:</label>
                <input type="text" className="form-control" required />
              </div>
              <button type="submit" className="btn btn-primary">Ingresar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLogin
