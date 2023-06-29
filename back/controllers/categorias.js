const {connection} = require('../database/config')

const getCategories = (req, res) => {
    connection.query('SELECT * FROM categorias_productos WHERE estado = 1', (error, results) => {
        if(error) throw error
        res.json(results)
    })
}

const seleccionarCategoria = (req, res) => {
    const id = req.params.id
    connection.query(`SELECT * FROM categorias_productos WHERE idCategoriaP=${id}`, (error, results) => {
        if (error) throw error
        res.json(results) 
    })
}

const crearCategoria = (req, res) => {
    connection.query('INSERT INTO categorias_productos SET ?', {
        nombreCategoria: req.body.nombreCategoria,
        estado: req.body.estado
    }, (error, results) => {
        if(error) throw error
        res.send(results)
    })
}

const editarCategoria = (req, res) => {
    const id = req.params.id
    const {nombreCategoria} = req.body
    connection.query(`UPDATE categorias_productos SET nombreCategoria='${nombreCategoria}'
                        WHERE idCategoriaP=${id}
    `, (error, results) => {
        if(error) throw error
        res.send(results)
    })
}

const borrarCategoria = (req, res) => {
    const id = req.params.id
    connection.query(`UPDATE categorias_productos SET estado = 0 WHERE idCategoriaP=${id}`, (error, results) => {
        if (error) throw error
        res.send(results)
    })
}

module.exports = {getCategories, seleccionarCategoria, crearCategoria, editarCategoria, borrarCategoria}