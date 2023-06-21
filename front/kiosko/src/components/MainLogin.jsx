/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom'
import '../CSS/MainLogin.css'
import { useState } from 'react'
import Swal from 'sweetalert2'


const MainLogin = () => {

  const navigate = useNavigate()
  let [usuario, setUsuario] = useState('Tobias')
  let [contraseña, setContrseña] = useState('hola')
  let [tipoUsuario, setTipoUsuario] = useState('Administrador')
  let [inputUsuario, setInputUsuario] = useState('')
  let [inputContraseña, setInputContraseña] = useState('')
  const [visible, setVisible] = useState(false)


  const ingresar = (e) => {
    if(inputUsuario === usuario && inputContraseña === contraseña){
      e.preventDefault()
      navigate('/home')
      setTimeout(() => {
        Swal.fire({
          title: 'Bienvenido ' + usuario,
          icon: 'success',
          text: 'Ingresaste como ' + tipoUsuario,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#a5f063',
          timer: 3000,
          timerProgressBar: true,
          showCloseButton: true
        })
      }, 100);
    } else {
      e.preventDefault()
      Swal.fire({
        title: 'Error',
        text: 'Debe ingresar datos validos.',
        icon: 'error',
        confirmButtonColor: '#a5f063',
        confirmButtonText: 'Aceptar',
        timer: 3000,
        timerProgressBar: true,
        showCloseButton: true
      })
    }
  }

  const handleChangeVisibility = () => {
    visible === false ? setVisible(true) : setVisible(false)
  }

  return (
    <div>
      <div className="container p-5 main-login">
        <div className="row d-flex justify-content-center">
          <h1 className="text-center tituloMain">KIOSKO LA ESQUINA</h1>
          <h2 className="text-center subTituloMain">Sistema de gestión</h2>
          <div className="col-6 mt-3 p-4 login">
            <h3 className="mb-4">Iniciar Sesión</h3>
            <form onSubmit={ingresar}>
              <div className="mb-3 d-flex flex-row gap-2">
                <label className="form-label">Usuario:</label>
                <input type="text" className="form-control" required onChange={(e) => setInputUsuario(e.target.value)}/>
              </div>
              <div className="mb-3 d-flex flex-row gap-2">
                <label className="form-label">Contraseña: </label>
                <input type={visible === false ? 'password' : 'text'} className="form-control" required onChange={(e) => setInputContraseña(e.target.value)}/>
                <i className={visible === false ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"} onClick={handleChangeVisibility}></i>
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

{/* <i class="bi bi-eye-fill"></i> */}
{/* <i class="bi bi-eye-slash-fill"></i> */}
