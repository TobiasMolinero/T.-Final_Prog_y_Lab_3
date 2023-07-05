const {Router} = require('express')
const router = Router()
const {mostrarDetallesTemp, eliminarItemTemp, agregarDetalleTemp, totalTemp, traerDetalleVenta, crearTablaTemp } = require('../controllers/detalleVentas')

router.get('/detalleVentas/', mostrarDetallesTemp)
router.get('/detalleVentas/totalTemp/', totalTemp)
router.get('/detalleVentas/creartablatemp/:id', crearTablaTemp)
router.post('/detalleVentas/crearTemp', agregarDetalleTemp)
router.delete('/detalleVentas/eliminarTemp/:id', eliminarItemTemp)

router.get('/detalleVentas/traerdetalle/:id', traerDetalleVenta)

module.exports = router