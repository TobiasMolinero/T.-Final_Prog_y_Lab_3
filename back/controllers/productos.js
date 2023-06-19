const {connection} = require("../database/config");

const mostrarProductos = (req, res) => {
    connection.query('SELECT * FROM productos', (error, results) => {
        if(error) throw error
        res.json(results)
    })
}

const crearProducto = (req, res) => {
    connection.query('INSERT INTO productos SET ?', {
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock,
        idCategoria: req.body.idCategoria
    }, (error, results) => {
        if(error) throw error
        res.send(results)
    })
}

const eliminarProducto = (req, res) => {
    const id = req.params.id
    console.log(id)
    connection.query(`DELETE FROM productos WHERE idProducto=${id}`, (error, results) => {
        if(error) throw error
        res.json(results)
    })
} 

module.exports = { mostrarProductos, crearProducto, eliminarProducto };
