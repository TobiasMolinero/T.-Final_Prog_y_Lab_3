const {connection} = require('../database/config')

const mostrarEmpleados = (req, res) => {
    connection.query('SELECT * FROM traer_empleados', (error, results) => {
        if(error) throw error
        res.json(results)
    })
}

const seleccionarEmpleado = (req, res) => {
    const id = req.params.id
    connection.query(`SELECT * FROM empleados WHERE idEmpleado=${id}`, (error, results) => {
        if(error) throw error
        res.json(results)
    })
}

const crearEmpleado = (req, res) => {
    connection.query('INSERT INTO empleados SET ?', {
        nombreE: req.body.nombreE,
        apellidoE: req.body.apellidoE,
        sueldo: req.body.sueldo,
        idTurno: req.body.idTurno,
        borrar: req.body.borrar
    },(error, results) => {
        if(error) throw error
        res.send(results)
    })
}

const borrarEmpleado = (req, res) => {
    const id = req.params.id
    connection.query(`UPDATE empleados SET borrar = 1 WHERE idEmpleado=${id}`, (error, results) => {
        if (error){
            throw error
        } else {
            res.send(results)
        }
    })
}

const editarEmpleado = (req, res) => {
    const id = req.params.id
    const {nombre, apellido, sueldo, idTurno, borrar} = req.body
    connection.query(`UPDATE empleados SET nombreE = '${nombre}', 
                        apellidoE = '${apellido}', 
                        sueldo = ${sueldo}, 
                        idTurno = ${idTurno},
                        borrar = ${borrar}
                        WHERE idEmpleado = ${id}
    `, (error, results) => {
        if(error) throw error
        res.send(results)
    })
}

module.exports = {mostrarEmpleados, crearEmpleado, borrarEmpleado, seleccionarEmpleado, editarEmpleado}