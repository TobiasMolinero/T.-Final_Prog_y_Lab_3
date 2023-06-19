const {connection} = require('../database/config')

const mostrarTurnos = (req, res) => {
    connection.query('SELECT * FROM turnos', (error, results) => {
        if(error) throw error
        res.json(results)
    })
}

module.exports = {mostrarTurnos}