const {connection} = require('../database/config')

const mostrarEmpleados = (req, res) => {
    connection.query('SELECT * FROM empleados', (error, results) => {
        if(error) throw error
        res.json(results)
    })
}

const crearEmpleado = (req, res) => {
    connection.query('INSERT INTO empleados SET ?', {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        sueldo: req.body.sueldo,
        idTurno: req.body.idTurno
    },(error, results) => {
        if(error) throw error
        res.send(results)
    })
}

module.exports = {mostrarEmpleados, crearEmpleado}