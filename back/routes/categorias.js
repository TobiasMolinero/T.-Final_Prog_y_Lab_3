const {Router} = require('express')
const router = Router()

const {getCategories} = require('../controllers/categorias')

router.get('/categorias', getCategories)

module.exports = router