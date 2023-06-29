const {Router} = require('express')
const router = Router()

const {getCategories, seleccionarCategoria, crearCategoria, editarCategoria, borrarCategoria } = require('../controllers/categorias')

router.get('/categorias', getCategories)
router.get('/categorias/:id', seleccionarCategoria)
router.post('/categorias/crear/', crearCategoria)
router.put('/categorias/editar/:id', editarCategoria)
router.put('/categorias/eliminar/:id', borrarCategoria)

module.exports = router