const express = require('express')
const logger = require('morgan')
const compression = require('compression')
const bodyParser = require('body-parser')
const cors = require('cors')
const {connection} = require('./database/config')

// ROUTES
const productos = require('./routes/productos')
const categorias = require('./routes/categorias')
const empleados = require('./routes/empleados')
const turnos = require('./routes/turnos')



// Definimos la app
const app = express()
app.use(bodyParser.json())
app.use(compression())
app.use(logger('dev'))
app.use(cors())


app.use('/', productos)
app.use('/', categorias)
app.use('/', empleados)
app.use('/', turnos)



// CONEXION A LA BASE DE DATOS

connection.connect(error => {
    if(error) throw error
    console.log('Conexion establecida con la DB')
})

// app.get('/productos', (req, res) => {
//     connection.query("SELECT * FROM Productos", (error, results)=> {
//         if(error) throw error
//         res.json(results)
//     })
// })

// app.get('/categorias' , (req, res) => {
//     connection.query('SELECT * FROM categorias_productos', (error, results) => {
//         if(error) throw error
//         res.json(results)
//     })
// })

//SERVIDOR
app.listen(3000)

app.get('/', (req, res) => {
    res.send('Todo Ok')
})
