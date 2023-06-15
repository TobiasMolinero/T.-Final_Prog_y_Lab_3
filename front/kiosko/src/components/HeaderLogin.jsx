import brand from '../assets/brand-header.png'
// import {Link} from 'react-router-dom'
// import {home} from '../constants/constants.js'


const HeaderLogin = () => {
    return (
        <header className='header-active'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid d-flex justify-content-center">
                    <img src={brand} alt="logo" className='logo' />
                    {/* <Link className="nav-link" aria-current="page" to={home}>Inicio</Link> */}
                </div>
            </nav>
        </header>
    )
}

export default HeaderLogin
