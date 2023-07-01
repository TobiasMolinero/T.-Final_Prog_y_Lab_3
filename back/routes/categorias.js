const {Router} = require('express')
const router = Router()

const {getCategories, seleccionarCategoria, crearCategoria, editarCategoria, borrarCategoria, filtrarCategoria } = require('../controllers/categorias')

router.get('/categorias', getCategories)
router.get('/categorias/:id', seleccionarCategoria)
router.post('/categorias/crear/', crearCategoria)
router.post('/categorias/filtrar', filtrarCategoria)
// router.post('/categorias/comprobar-productos', comprobarProductos)
router.put('/categorias/editar/:id', editarCategoria)
router.put('/categorias/eliminar/:id', borrarCategoria)

module.exports = router