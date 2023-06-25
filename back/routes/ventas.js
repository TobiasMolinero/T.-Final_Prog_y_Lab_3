const {Router} = require('express')
const router = Router()
const {mostrarVentas, crearVenta, borrarVenta, seleccionarVenta, editarVenta} = require('../controllers/ventas')

router.get('/ventas', mostrarVentas)
router.get('/ventas/:id', seleccionarVenta)
router.post('/ventas/crear/', crearVenta)
router.put('/ventas/editar/:id', editarVenta)
router.put('/ventas/eliminar/:id', borrarVenta)

module.exports = router