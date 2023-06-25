const {Router} = require('express')
const router = Router()
const {mostrarEmpleados, seleccionarEmpleado, crearEmpleado, borrarEmpleado, editarEmpleado} = require('../controllers/empleados') 

router.get('/empleados', mostrarEmpleados)
router.get('/empleados/:id', seleccionarEmpleado)
router.post('/empleados/crear/', crearEmpleado)
router.put('/empleados/editar/:id', editarEmpleado)
router.put('/empleados/eliminar/:id', borrarEmpleado)

module.exports = router