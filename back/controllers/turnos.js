const {connection} = require('../database/config')

const mostrarTurnos = (req, res) => {
    connection.query('SELECT * FROM turnos WHERE estado = 1', (error, results) => {
        if(error) throw error
        res.json(results)
    })
}

module.exports = {mostrarTurnos}