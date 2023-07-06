const {connection} = require('../database/config')
const { connect } = require('../routes/ventas')

const mostrarDetallesTemp = (req, res) => {
    connection.query('SELECT * FROM traer_detalle_temp ', (error, results) => {
        if (error) throw error
        res.json(results)
    })
}

const agregarDetalleTemp = (req, res) => {
    connection.query('INSERT INTO detalle_ventas_temporal SET ?', {
        idVenta: req.body.idVenta,
        idProducto: req.body.idProducto,
        cantidad: req.body.cantidad,
        precio: req.body.precio,    
    }, (error, results) => {
        if(error) throw error
        res.send(results)
    })
}

const eliminarItemTemp = (req, res) => {
    const id = req.params.id
    connection.query(`DELETE FROM detalle_ventas_temporal WHERE idDetalleVenta = ${id}`, (error, results) => {
        if(error) throw error
        res.send(results)
    })
}

const totalTemp = (req, res) => {
    connection.query('SELECT sum(subTotal) total FROM detalle_ventas_temporal', (error, results) => {
        if (error) throw error
        res.json(results)
    })
}


const traerDetalleVenta = (req, res) => {
    const id = req.params.id
    connection.query(`SELECT d.idDetalleVenta, d.idVenta, p.descripcion, d.cantidad, d.precio, d.subTotal FROM detalle_ventas d
                        INNER JOIN productos p
                        ON d.idProducto = p.idProducto
                        WHERE d.idVenta = ${id} AND d.estado = 1
    `, (error, results) => {
        if (error) throw error
        res.json(results)
    })
}

const crearTablaTemp = (req, res) => {

    const id = req.params.id

    connection.query(`DELETE FROM detalle_ventas_temporal WHERE idVenta = ${id}`, (error, results) => {
        if (error) throw error
    })

    connection.query(`INSERT INTO detalle_ventas_temporal (idVenta, idProducto, cantidad, precio)
                        SELECT idVenta, idProducto, cantidad, precio FROM detalle_ventas WHERE idVenta = ${id} AND estado = 1
    `, (error, results) => {
        if(error) throw error
    })

    connection.query(`SELECT d.idDetalleVenta, d.idVenta, p.descripcion, d.cantidad, d.precio, d.subTotal FROM detalle_ventas_temporal d
                        INNER JOIN productos p
                        ON d.idProducto = p.idProducto
                        WHERE d.idVenta = ${id}
    `, (error, results) => {
        if(error) throw error
        res.json(results)
    })
}

module.exports = {mostrarDetallesTemp, agregarDetalleTemp, eliminarItemTemp, totalTemp, traerDetalleVenta, crearTablaTemp}