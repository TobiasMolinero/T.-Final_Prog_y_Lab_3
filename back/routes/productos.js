const {Router} = require('express')
const router = Router()

const {mostrarProductos} = require('../controllers/productos.js')

router.get('/productos', mostrarProductos)

module.exports = router