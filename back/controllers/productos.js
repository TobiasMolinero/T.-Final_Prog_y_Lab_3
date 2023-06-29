const {connection} = require("../database/config");

const mostrarProductos = (req, res) => {
    connection.query('SELECT * FROM traer_productos', (error, results) => {
        if(error) throw error
        res.json(results)
    })
}

const seleccionarProducto = (req, res) => {
    const id = req.params.id
    connection.query(`SELECT * FROM productos WHERE idProducto=${id}`, (error, results) => {
        if(error) throw error
        res.json(results)
    })
}

const crearProducto = (req, res) => {
    connection.query('INSERT INTO productos SET ?', {
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock,
        idCategoria: req.body.idCategoria,
        estado: req.body.estado
    }, (error, results) => {
        if(error) throw error
        res.send(results)
    })
}

const editarProducto = (req, res) => {
    const id = req.params.id
    const {descripcion, precio, stock, idCategoria, estado} = req.body
    connection.query(`UPDATE productos SET descripcion = '${descripcion}', 
                        precio = ${precio}, 
                        stock = ${stock}, 
                        idCategoria = ${idCategoria},
                        estado = ${estado} 
                        WHERE idProducto = ${id}
    `, (error, results) => {
        if(error) throw error
        res.send(results)
    })
}

const borrarProducto = (req, res) => {
    const id = req.params.id
    connection.query(`UPDATE productos SET estado = 0 WHERE idProducto=${id}`, (error, results) => {
        if(error){
            throw error
        } else {
            res.send(results)
        }
    })
} 


module.exports = { mostrarProductos, crearProducto, borrarProducto, seleccionarProducto, editarProducto};
