/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { productos, categoriasProductos_URL, productos_URL, productos_editar_URL } from "../constants/constants"
import axios from 'axios'
import Swal from "sweetalert2"

const MainEditarEmpleado = () => {

    let { id } = useParams()
    let navigate = useNavigate()

    const formEditar = document.getElementById('formEditar')
    const selectCat = document.getElementById('selectCat')

    const [categoriasProductos, setCategoriasProductos] = useState([])

    const [descripcion, setDescripcion] = useState()
    const [precio, setPrecio] = useState()
    const [stock, setStock] = useState()
    const [categoria, setCategoria] = useState()

    const getProduct = async () => {
        let response = await axios.get(productos_URL + id)
        setDescripcion(response.data[0].descripcion)
        setPrecio(response.data[0].precio)
        setStock(response.data[0].stock)
        setCategoria(response.data[0].idCategoria)
    }

    const getCategoriesProducts = async () => {
        let response = await axios.get(categoriasProductos_URL)
        setCategoriasProductos(response.data)
    }

    const handleEditProduct = async (e) => {
        e.preventDefault()
        await axios.put(productos_editar_URL + id, {
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
                    text: 'El producto se modificó con exito, Volviendo a productos.',
                    showConfirmButton: false,
                    timer: 1800,
                    timerProgressBar: true,
                })
                setTimeout(() => {
                    navigate(productos)
                }, 2020);
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


    const disabledInputStock = (e) => {
        if(e.keyCode === 109 || e.keyCode === 110 || e.keyCode === 189 || e.keyCode === 107 || e.keyCode === 187 || e.keyCode === 188 || e.keyCode === 69 || e.keyCode === 190) {
            e.preventDefault()
        }
    }

    const disabledInputPrecio = (e) => {
        if(e.keyCode === 109 || e.keyCode === 189 || e.keyCode === 107 || e.keyCode === 187 || e.keyCode === 188 || e.keyCode === 69) {
            e.preventDefault()
        }
    }

    useEffect(() => {
        getCategoriesProducts()
        setTimeout(() => {
            getProduct()
        }, 100);
    }, [])

    return (
        <div className="container p-4 main-productos">
            <div className="row justify-content-center">
                <h1 className="titulo-productos text-center">Editar Producto</h1>
                <div className="col-8 d-flex flex-column align-items-center mt-4 bg-warning formE">
                    <form id="formEditar" className="mt-3" onSubmit={handleEditProduct}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="txtDescripcion">Descripción: </label>
                            <input type="text" id="txtDescripcion" defaultValue={descripcion} onChange={(e) => { setDescripcion(e.target.value) }} autoComplete="off" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="txtPrecio">*Precio: </label>
                            <input type="number" id="txtPrecio" placeholder="Ej: 243.85" defaultValue={precio} onKeyDown={disabledInputPrecio} onChange={(e) => { setPrecio(e.target.value) }}min={0} step={0.01} autoComplete="off" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="txtStock">Stock: </label>
                            <input type="number" id="txtStock" defaultValue={stock} onKeyDown={disabledInputStock} onChange={(e) => { setStock(e.target.value) }} min={0} autoComplete="off" required />
                        </div>
                        <div className="mb-3">
                            <select className="form-select" id="selectCat" value={categoria} onChange={(e) => { setCategoria(e.target.value) }} autoComplete="off" required>
                                {categoriasProductos.map(categoria =>
                                    <option key={categoria.idCategoriaP} value={categoria.idCategoriaP}>{categoria.nombreCategoria}</option>
                                )}
                            </select>
                        </div>
                        <div className="mb-3 d-flex justify-content-center gap-3">
                            <Link to={productos} onClick={() => { formEditar.reset() }}><button className="btn btn-secondary">Cancelar y Volver</button></Link>
                            <button type="submit" className="btn btn-success">Modificar</button>
                        </div>
                    </form>
                    <p>(*)Se aceptan hasta 8 números enteros y solo se aceptan dos números decimales.</p>                
                </div>
            </div>
        </div>
    )
}

export default MainEditarEmpleado
