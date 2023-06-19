const {Router} = require('express')
const router = Router()
const {mostrarTurnos} = require('../controllers/turnos')

router.get('/turnos', mostrarTurnos)

module.exports = router