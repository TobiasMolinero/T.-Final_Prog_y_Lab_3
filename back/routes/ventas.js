const {Router} = require('express')
const router = Router()
const {mostrarVentas, crearVenta, borrarVenta, editarVenta, ultimoId, traerVenta, seleccionarVenta} = require('../controllers/ventas')

router.get('/ventas/', mostrarVentas)
router.get('/ventas/seleccionarventa/:id', seleccionarVenta)
router.get('/ventas/traerventa/:id', traerVenta)
router.get('/ventas/ultimoId/', ultimoId)
router.post('/ventas/crear/', crearVenta)
router.put('/ventas/editar/:id', editarVenta)
router.put('/ventas/eliminar/:id', borrarVenta)


module.exports = router