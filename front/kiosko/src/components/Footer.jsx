import '../CSS/Footer.css'

const Footer = () => {
  return (
    <footer className="mt-5">
      <div className="row px-5">
        <div className="col-6 mt-4 px-5">
          <h3>Sobre Nosotros</h3>
          <p>Este proyecto fue desarrollado por: Llovera Alvaro, Majolli Facundo y Tobias Molinero. Alumnos de 2° Año de la Tecnicatura Unversitaria en Programación. </p>
        </div>
        <div className="col-6 mt-4 px-5 d-flex flex-column align-items-center justify-content-center">
          <div>
            <h3 className='text-center'>Info - Contacto</h3>
            <ul>
              <li className='item-info-contacto'><i className="bi bi-telephone-fill item-info-contacto-icon me-3"></i>3815999999</li>
              <li className='item-info-contacto'><i className="bi bi-envelope-at-fill item-info-contacto-icon me-3"></i>ejemplomail@gmail.com</li>
              <li className='item-info-contacto'><i className="bi bi-geo-alt-fill item-info-contacto-icon me-3"></i>Tucuman, Argentina</li>
            </ul>
          </div>
          <div className='mt-3'>
            <h3 className='text-center'>Redes</h3>
            <div className="redes d-flex justify-content-center gap-3">
              <i className="bi bi-instagram icons-redes"></i>
              <i className="bi bi-facebook icons-redes"></i>
              <i className="bi bi-github icons-redes"></i>
            </div>
          </div>
        </div> 
      </div>
      <div className="row mt-4 pt-3 derechos">
        <p className="text-center">Desarrollado por Llovera Alvaro, Majolli Facundo y Molinero Tobias, 2023 &#169;</p>
      </div>
    </footer>
  )
}

export default Footer
