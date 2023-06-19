const {connection} = require('../database/config')

const getCategories = (req, res) => {
    connection.query('SELECT * FROM categorias_productos', (error, results) => {
        if(error) throw error
        res.json(results)
    })
}

module.exports = {getCategories}