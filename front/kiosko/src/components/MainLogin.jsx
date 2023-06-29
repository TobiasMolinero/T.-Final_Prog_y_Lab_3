/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom'
import '../CSS/MainLogin.css'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { validar_usuarios_URL } from '../constants/constants'
import brand from '../assets/brand-header.png'


const MainLogin = () => {

  const navigate = useNavigate()
  let [usuario, setUsuario] = useState('Tobias')
  let [contraseña, setContraseña] = useState('hola')
  const [visible, setVisible] = useState(false)

  const handleIngresar = async(e) => {
    e.preventDefault()
    await axios.post(validar_usuarios_URL, {
      nombreUsuario: usuario,
      contraseña: contraseña
    })
    .then((result) => {
      console.log(result)
      if(result.data === 0){
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: 'Debe ingresar datos validos.',
          confirmButtonText: 'Volver',
          confirmButtonColor: '#a5f063',
          timer: 2000,
          timerProgressBar: true, 
        })
      } else {
        navigate('/home')
        setTimeout(() => {
        Swal.fire({
          title: 'Bienvenido de nuevo',
          icon: 'success',
          text: 'Ingresaste como Admin.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#a5f063',
          timer: 3000,
          timerProgressBar: true,
          showCloseButton: true
        })
        }, 390);
      }
    }).catch((err) => {
      console.log(err)
    });
  }

  const handleChangeVisibility = () => {
    visible === false ? setVisible(true) : setVisible(false)
  }

  return (
    <div>
      <div className="container p-5 main-login">
        <div className="row">
          <img src={brand} className='brand mx-auto' alt="" />
        </div>
        <div className="row d-flex justify-content-center">
          {/* <h1 className="text-center tituloMain">KIOSKO LA ESQUINA</h1> */}
          {/* <h2 className="text-center subTituloMain">Sistema de gestión</h2> */}
          <div className="col-6 mt-4 p-4 login">
            <h2 className="mb-4 title-form">Iniciar Sesión</h2>
            <form id="formLogin" onSubmit={handleIngresar}>
              <div className="mb-3 d-flex flex-row gap-2">
                <label className="form-label label-login align-self-center">Usuario:</label>
                <input type="text" className="form-control" required onChange={(e) => setUsuario(e.target.value)}/>
              </div>
              <div className="mb-3 d-flex flex-row gap-2">
                <label className="form-label label-login align-self-center">Contraseña: </label>
                <input type={visible === false ? 'password' : 'text'} className="form-control" required onChange={(e) => setContraseña(e.target.value)}/>
                <i className={visible === false ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"} onClick={handleChangeVisibility}></i>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-success">Ingresar</button>
              </div>
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
