/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import '../CSS/MainProductos.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { productos, productos_crear_URL, categoriasProductos_URL } from '../constants/constants'
import { Link, useNavigate } from 'react-router-dom'

const MainAgregarProducto = () => {

    const navigate = useNavigate()

    const [categoriasProductos, setCategoriaProductos] = useState([])

    const [descripcion, setDescripcion] = useState()
    const [precio, setPrecio] = useState()
    const [stock, setStock] = useState()
    const [categoria, setCategoria] = useState()

    const formAgregar = document.getElementById('formAgregar')
    const selectCat = document.getElementById('selectCat')

    const getCategoriesProducts = async () => {
        let response = await axios.get(categoriasProductos_URL)
        setCategoriaProductos(response.data)
    }

    const handleSaveProduct = async (e) => {
        e.preventDefault()
        if (selectCat.value === 'selected' || selectCat.value === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Atención',
                text: 'Debe seleccionar una categoria.',
                confirmButtonColor: '#a5f063',
                confirmButtonText: 'Aceptar',
                timer: 2000,
                timerProgressBar: true
            })
        } else {
            await axios.post(productos_crear_URL, {
                descripcion: descripcion,
                precio: precio,
                stock: stock,
                idCategoria: categoria,
                borrar: 0
            })
                .then((result) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Guardado',
                        text: 'El registro del nuevo producto se guardó con exito.',
                        confirmButtonColor: '#a5f063',
                        showCloseButton: true,
                        timer: 2000,
                        timerProgressBar: true
                    })
                    formAgregar.reset()
                    setTimeout(() => {
                      navigate(productos)
                    }, 2015);
                }).catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'ERROR',
                        text: err,
                        showCloseButton: true,
                        timer: 2000,
                        timerProgressBar: true
                    })
                });
        }
    }

    useEffect(() => {
        getCategoriesProducts()
    }, [])

    return (
        <div className="container p-4 main-productos">
            <div className="row justify-content-center">
                <h1 className="titulo-productos text-center">Agregar Producto</h1>
                <div className="col-8 d-flex flex-column align-items-center mt-4 formA">
                    <form id="formAgregar" onSubmit={handleSaveProduct}>
                        <div className='mb-3'>
                            <label htmlFor="txtDescripcion" className='form-label me-3'>Descripción:</label>
                            <input type="text" id="txtDescripcion" onChange={(e) => { setDescripcion(e.target.value) }} autoComplete='off' required />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="txtPrecio" className='form-label me-3'>Precio: </label>
                            <input type="text" id="txtPrecio" onChange={(e) => { setPrecio(e.target.value) }} autoComplete='off' required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="txtStock" className='form-label me-3'>Stock: </label>
                            <input type="number" id='txtStock' onChange={(e) => { setStock(e.target.value) }} autoComplete='off' required />
                        </div>
                        <div className='mb-3'>
                            <select className="form-select" id="selectCat" aria-label="Default select example" defaultValue='selected' onChange={(e) => { setCategoria(e.target.value) }} required>
                                <option value="selected">-- SELECCIONE CATEGORIA --</option>
                                {categoriasProductos.map(categoria =>
                                    <option key={categoria.idCategoriaP} value={categoria.idCategoriaP}>{categoria.nombreCategoria}</option>
                                )}
                            </select>
                        </div>
                        <div className="mb-3 d-flex justify-content-center gap-3">
                            <Link to={productos} onClick={() => { formAgregar.reset() }}><button className="btn btn-secondary" type='button'>Cancelar y Volver</button></Link>
                            <button type="submit" className="btn btn-success">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MainAgregarProducto
