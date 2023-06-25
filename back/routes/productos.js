const {Router} = require('express')
const router = Router()
const {mostrarProductos, seleccionarProducto, crearProducto, editarProducto, borrarProducto} = require('../controllers/productos.js')

router.get('/productos', mostrarProductos)
router.get('/productos/:id', seleccionarProducto)
router.post('/productos/crear/', crearProducto)
router.put('/productos/editar/:id', editarProducto)
router.put('/productos/eliminar/:id', borrarProducto)

module.exports = router