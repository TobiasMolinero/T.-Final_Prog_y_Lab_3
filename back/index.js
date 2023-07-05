const express = require('express')
const logger = require('morgan')
const compression = require('compression')
const bodyParser = require('body-parser')
const cors = require('cors')
const {connection} = require('./database/config')

// ROUTES
const ventas = require('./routes/ventas')
const detalleVentas = require('./routes/detalleVentas')
const productos = require('./routes/productos')
const categorias = require('./routes/categorias')
const empleados = require('./routes/empleados')
const turnos = require('./routes/turnos')
const clientes = require('./routes/clientes')
const usuarios = require('./routes/usuarios')

// APP
const app = express()
app.use(bodyParser.json())
app.use(compression())
app.use(logger('dev'))
app.use(cors())

app.use('/', ventas)
app.use('/', detalleVentas)
app.use('/', productos)
app.use('/', categorias)
app.use('/', empleados)
app.use('/', turnos)
app.use('/', clientes)
app.use('/', usuarios)

// VERIFICAR CONEXION A LA BASE DE DATOS
connection.connect(error => {
    if(error) throw error
    console.log('Conexion establecida con la DB')
})

//SERVIDOR
app.listen(3000)
app.get('/', (req, res) => {
    res.send('Servidor Activo')
})
