const express = require('express')
const logger = require('morgan')
const compression = require('compression')
const bodyParser = require('body-parser')
const cors = require('cors')

// ROUTES
// const productos = require('./routes/productos.js')



// Definimos la app
const app = express()
app.use(bodyParser.json())
app.use(compression())
app.use(logger('dev'))
app.use(cors())
// app.use('/productos', productos)



// CONEXION A LA BASE DE DATOS
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'kiosko_tobias'
})

app.get('/productos', (req, res) => {
    connection.query("SELECT * FROM Productos", (error, results)=> {
        if(error) throw error
        res.json(results)
    })
})

app.get('/categorias' , (req, res) => {
    connection.query('SELECT * FROM categorias_productos', (error, results) => {
        if(error) throw error
        res.json(results)
    })
})

//SERVIDOR
app.listen(3000)

app.get('/', (req, res) => {
    res.json('Todo Ok')
})