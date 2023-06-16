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
                <input type="text" className="form-control" required onChange={(e) => setInputUsuario(e.target.value)}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña:</label>
                <input type="password" className="form-control" required onChange={(e) => setInputContraseña(e.target.value)}/>
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
