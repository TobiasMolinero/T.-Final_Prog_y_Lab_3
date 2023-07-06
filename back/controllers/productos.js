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
    console.log(id)
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

const validarProducto = (req, res) => {
    const {descripcion} = req.body
    connection.query(`SELECT descripcion FROM productos WHERE descripcion = '${descripcion}' AND estado = 1`, (error, results) => {
        if(error) throw error
        if(results.length === 0){
            res.json(0)
        } else {
            res.json(1)
        }
    })
}


module.exports = { mostrarProductos, crearProducto, borrarProducto, seleccionarProducto, editarProducto, validarProducto};
