/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Table } from "react-bootstrap"
import axios from 'axios'
import Swal from "sweetalert2"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { productos, categoriasProductos_URL, categoriasProductos_crear_URL, categoriasProductos_editar_URL, categoriasProductos_eliminar_URL } from "../constants/constants"

const MainCategorias = () => {

    const [categorias, setCategorias] = useState([])
    const [nombreCategoria, setNombreCategoria] = useState()
    const [botonAdd, setBotonAdd] = useState(true)
    const [botonEdit, setBotonEdit] = useState(false)
    const [botonCancel, setBotonCancel] = useState(false)
    const [idAux, setIdAux] = useState()

    const getCategorias = async() => {
        let response = await axios.get(categoriasProductos_URL)
        setCategorias(response.data)
    } 
    
    const handleCrearCategoria = async(e) => {
        e.preventDefault()
        await axios.post(categoriasProductos_crear_URL, {
            nombreCategoria: nombreCategoria,
            estado: 1
        })
        .then((result) => {
            Swal.fire({
                icon: 'success',
                title: '¡Guardado!',
                text: 'Nueva categoria registrada con exito',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#a5f063',
                showCloseButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                allowEnterKey: false,
            })
            getCategorias()
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

    const handleSeleccionarCategoria = async(id) => {
        let response = await axios.get(categoriasProductos_URL + id)
        setNombreCategoria(response.data[0].nombreCategoria)
        setIdAux(response.data[0].idCategoriaP)
        setBotonAdd(false)
        setBotonEdit(true)
        setBotonCancel(true)
    }

    const handleEditCategoria = async() => {
        await axios.put(categoriasProductos_editar_URL + idAux, {
            nombreCategoria: nombreCategoria,
            estado: 1,
        })
        .then((result) => {
            Swal.fire({
                icon: 'success',
                title: 'Guardado',
                text: 'La categoria se modificó con exito',
                showConfirmButton: false,
                showCloseButton: false,
                timer: 2000,
                timerProgressBar: true,
                allowEscapeKey: false,
                allowOutsideClick: false,
                allowEnterKey: false,
            })
            getCategorias()
            handleCancelEdit()
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

    const handleBorrarCategoria = (id) => {
        Swal.fire({
            icon: 'warning',
            text: '¿Esta seguro que quiere borrar este registro?',
            showCancelButton: true,
            cancelButtonColor: 'grey',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Borrar',
            confirmButtonColor: '#FF2E11',
            allowOutsideClick: false,
            allowEnterKey: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              axios.put(categoriasProductos_eliminar_URL + id)
                .then((result) => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Eliminado',
                    text: 'El registro se eliminó con exito.',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                  })
                  getCategorias()
                }).catch((err) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    showCloseButton: true,
                    text: err,
                    confirmButtonColor: '#FF2E11',
                  })
                });
            }
          })
    }

    const handleCancelEdit = () => {
        setBotonAdd(true)
        setBotonEdit(false)
        setBotonCancel(false)
        setNombreCategoria('')
    }

    useEffect(() => {
        getCategorias()
    }, [])

    return (
        <div className="container p-4 main-productos">
            <h1 className="titulo-productos text-center">Categorias</h1>
            <div>
                <Link to={productos}><i className="bi bi-arrow-left me-2"></i>Volver a Productos</Link>
            </div>
            <div className="row">
                <div className="col-6">
                    <Table bordered hover striped className="table mt-2 text-center">
                        <thead>
                            <tr>
                                <th scope="col">Nombre Categoria</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.length === 0 ? <tr><td colSpan={3}><h4>No hay categorias registradas</h4></td></tr> : categorias.map(categoria => 
                                <tr key={categoria.idCategoriaP}>
                                    <td>{categoria.nombreCategoria}</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                            <button type="button" className="btn btn-danger" onClick={() => handleBorrarCategoria(categoria.idCategoriaP)}><i className="bi bi-trash"></i></button>
                                            <button type="button" className="btn btn-warning" onClick={() => handleSeleccionarCategoria(categoria.idCategoriaP)}><i className="bi bi-pencil-square"></i></button>
                                        </div>
                                    </td>
                                </tr>    
                            )}
                        </tbody>
                    </Table>
                </div>
                <div className="col-6 mt-2">
                    <h3 className="text-center">Agregar/Editar Categoria</h3>
                    <form className="form text-center mt-4">
                        <div className="d-flex flex-row justify-content-center">
                            <label className="form-label me-2" htmlFor="txtCategoriaP">Nombre:</label>
                            <input type="text" id="txtCategoriaP" value={nombreCategoria} onChange={(e) => {setNombreCategoria(e.target.value)}} required/>
                        </div>
                        <div className="mt-3">
                            <button className="btn btn-success btnAgregar me-2" type="submit" onClick={handleCrearCategoria} disabled={nombreCategoria === '' || nombreCategoria === undefined ? true : false} hidden={botonAdd ? false : true}><i className="bi bi-plus-circle me-2"></i>Agregar</button>
                            <button className="btn btn-warning btnAgregar me-2" type="button" onClick={handleEditCategoria} hidden={botonEdit === false ? true : false}><i className="bi bi-pencil-square me-2"></i>Editar</button>
                            <button className="btn btn-secondary btnAgregar" type="button" onClick={handleCancelEdit} hidden={botonCancel === false ? true: false}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MainCategorias
