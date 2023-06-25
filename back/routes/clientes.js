const {Router} = require('express')
const router = Router()
const {mostrarClientes, seleccionarCliente, crearCliente, editarCliente, borrarCliente} = require('../controllers/clientes')

router.get('/clientes', mostrarClientes)
router.get('/clientes/:id', seleccionarCliente)
router.post('/clientes/crear/', crearCliente)
router.put('/clientes/editar/:id', editarCliente)
router.put('/clientes/eliminar/:id', borrarCliente)

module.exports = router