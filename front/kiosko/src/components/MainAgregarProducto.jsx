/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import '../CSS/MainProductos.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { productos, productos_validarProducto_URL, productos_crear_URL, categoriasProductos_URL } from '../constants/constants'
import { Link, useNavigate } from 'react-router-dom'

const MainAgregarProducto = () => {

    const navigate = useNavigate()

    const [prod, setProductos] = useState([])
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
            await axios.post(productos_validarProducto_URL, {
                descripcion: descripcion,
            })
                .then((result) => {
                    if (result.data === 1) {
                        Swal.fire({
                            icon: 'warning',
                            title: '¡Atención!',
                            text: 'Ese producto ya existe',
                            confirmButtonColor: '#a5f063',
                            confirmButtonText: 'Aceptar',
                            timer: 2000,
                            timerProgressBar: true,
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            allowEnterKey: false,
                        })
                    } else {
                        axios.post(productos_crear_URL, {
                            descripcion: descripcion,
                            precio: precio,
                            stock: stock,
                            idCategoria: categoria,
                            estado: 1
                        })
                            .then((result) => {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Guardado',
                                    text: 'El registro del nuevo producto se guardó con exito.',
                                    showConfirmButton: true,
                                    confirmButtonColor: '#a5f063',
                                    confirmButtonText: 'Aceptar',
                                    showCloseButton: false,
                                    allowEscapeKey: false,
                                    allowOutsideClick: false,
                                    allowEnterKey: false,
                                })
                                // .then((result) => {
                                //     formAgregar.reset()
                                //     if (result.isConfirmed) {
                                //         Swal.fire({
                                //             icon: 'question',
                                //             text: '¿Desea registrar otro producto?',
                                //             showCloseButton: false,
                                //             confirmButtonText: 'Aceptar',
                                //             confirmButtonColor: '#a5f063',
                                //             showCancelButton: true,
                                //             cancelButtonText: 'cancelar',
                                //             cancelButtonColor: 'grey',
                                //             allowEscapeKey: false,
                                //             allowOutsideClick: false,
                                //             allowEnterKey: false,
                                //         }).then((result) => {
                                //             if (result.isDismissed) {
                                //                 navigate(productos)
                                //             } else {
                                //                 Swal.close
                                //             }
                                //         })
                                //     }
                                // })
                                formAgregar.reset()
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
                }).catch((err) => {
                    alert(err.messaeg)
                });
        }
    }



    const disabledInputStock = (e) => {
    if (e.keyCode === 109 || e.keyCode === 110 || e.keyCode === 189 || e.keyCode === 107 || e.keyCode === 187 || e.keyCode === 188 || e.keyCode === 69 || e.keyCode === 190) {
        e.preventDefault()
    }
    }

    const disabledInputPrecio = (e) => {
    if (e.keyCode === 109 || e.keyCode === 189 || e.keyCode === 107 || e.keyCode === 187 || e.keyCode === 188 || e.keyCode === 69) {
        e.preventDefault()
    }
    }

    useEffect(() => {
        getCategoriesProducts()
    }, [])

    return (
    <div className="container p-4 main-productos">
        <h1 className="titulo-productos text-center">Agregar Producto</h1>
        <div className="row justify-content-center">
            <div className="col-8 d-flex flex-column align-items-center mt-4 formA">
                <form id="formAgregar" onSubmit={handleSaveProduct}>
                    <div className='mb-3'>
                        <label htmlFor="txtDescripcion" className='form-label me-3'>Descripción:</label>
                        <input type="text" id="txtDescripcion" onChange={(e) => { setDescripcion(e.target.value) }} autoComplete='off' required />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="txtPrecio" className='form-label me-3'>*Precio: </label>
                        <input type="number" id="txtPrecio" placeholder="Ej: 243.85" onKeyDown={disabledInputPrecio} onChange={(e) => { setPrecio(e.target.value) }} min={0} step={0.01} autoComplete='off' required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtStock" className='form-label me-3'>Stock: </label>
                        <input type="number" id='txtStock' onKeyDown={disabledInputStock} onChange={(e) => { setStock(e.target.value) }} min={0} autoComplete='off' required />
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
                <p>(*)Se aceptan hasta 8 números enteros y solo se aceptan dos números decimales.</p>
            </div>
        </div>
    </div>
    )
}

export default MainAgregarProducto
