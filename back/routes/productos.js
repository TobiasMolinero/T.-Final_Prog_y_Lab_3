const {Router} = require('express')
const router = Router()
const {mostrarProductos, seleccionarProducto, crearProducto, editarProducto, eliminarProducto} = require('../controllers/productos.js')

router.get('/productos', mostrarProductos)
router.get('/productos/:id', seleccionarProducto)
router.post('/productos', crearProducto)
router.put('/productos/:id', editarProducto)
router.delete('/productos/:id', eliminarProducto)

module.exports = router