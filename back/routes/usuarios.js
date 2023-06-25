const {Router} = require('express')
const router = Router()
const {validarUsuario} = require('../controllers/usuarios')

router.post('/usuarios/login' , validarUsuario)

module.exports = router