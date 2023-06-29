const {connection} = require('../database/config')

const mostrarVentas = (req, res) => {
    connection.query('SELECT * FROM traer_ventas', (error, results) => {
        if(error) throw error
        res.json(results)
    })
}

const seleccionarVenta = (req, res) => {
    const id = req.params.id
    connection.query(`SELECT * FROM ventas WHERE idVenta=${id}`, (error, results) => {
        if(error) throw error
        res.json(results)
    })
}

const crearVenta = (req, res) => {
    connection.query('INSERT INTO ventas SET ?', {
        nroFactura: req.body.nroFactura,
        idEmpleado: req.body.idEmpleado,
        idCliente: req.body.idCliente,
        idProducto: req.body.idProducto,
        fecha: req.body.fecha,
        cantidad: req.body.cantidad,
        total: req.body.total,
        estado: req.body.estado
    }
    ,(error, results) => {
        if(error) throw error
        res.send(results)
    })
}

const editarVenta = (req, res) => {
    const id = req.params.id
    const {nroFactura, idEmpleado, idCliente, idProducto, fecha, cantidad, total, estado} = req.body
    connection.query(`UPDATE ventas SET nroFactura=${nroFactura},
                        idEmpleado=${idEmpleado},
                        idCliente=${idCliente},
                        idProducto=${idProducto},
                        fecha='${fecha}',
                        cantidad=${cantidad},
                        total=${total},
                        estado=${estado}
                        WHERE idVenta = ${id}
    `, (error, results) => {
        if(error) throw error
        res.send(results)
    })
}

const borrarVenta = (req, res) => {
    const id = req.params.id
    connection.query(`UPDATE ventas SET estado = 0 WHERE idVenta=${id}`, (error, results) => {
        if(error) throw error
        res.send(results)
    })
}


module.exports = {mostrarVentas, crearVenta, borrarVenta, seleccionarVenta, editarVenta}