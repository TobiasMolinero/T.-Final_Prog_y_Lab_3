const {Router} = require('express')
const router = Router()
const {mostrarEmpleados, crearEmpleado} = require('../controllers/empleados') 

router.get('/empleados', mostrarEmpleados)
router.post('/empleados', crearEmpleado)

module.exports = router