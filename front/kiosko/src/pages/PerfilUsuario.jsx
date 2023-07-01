/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import '../CSS/perfilUsuario.css'


const PerfilUsuario = () => {


    return (
        <>
            <Header />
            <div className="container p-4 main-perfil">
                <h1 className='text-center mt-3'>Perfil Usuario</h1>
                <div className="row d-flex justify-content-center">
                    <div className="col-4">
                        <hr />
                        <ul className='datos-perfil mt-5 d-flex flex-column align-items-start gap-3'>
                            <li>Nombre:</li>
                            <li>Apellido:</li>
                            <li>Nombre de usuario:</li>
                            <li>Codigo de usuario:</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default PerfilUsuario
