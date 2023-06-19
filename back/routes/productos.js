const {Router} = require('express')
const router = Router()
const {mostrarProductos, crearProducto, eliminarProducto} = require('../controllers/productos.js')

router.get('/productos', mostrarProductos)
router.post('/productos', crearProducto)
router.delete('/productos/:id', eliminarProducto)

module.exports = router