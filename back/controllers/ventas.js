const {connection} = require('../database/config')

const mostrarVentas = (req, res) => {
    connection.query('SELECT * FROM traer_ventas', (error, results) => {
        if(error) throw error
        res.json(results)
    })
}

const traerVenta = (req, res) => {
    const id = req.params.id
    connection.query(`SELECT  v.idVenta, v.nroFactura, e.nombreE, e.apellidoE, c.nombreC, c.apellidoC, v.total FROM ventas v
                        INNER JOIN empleados e
                        ON v.idEmpleado = e.idEmpleado
                        INNER JOIN clientes c
                        ON v.idCliente = c.idCliente
                        WHERE v.estado = 1 AND idVenta = ${id};
    `, (error, results) => {
        if(error) throw error
        res.json(results)
    })
}

// const seleccionarVenta = (req, res) => {
//     const id = req.params.id
//     connection.query(`SELECT * FROM ventas WHERE idVenta=${id}`, (error, results) => {
//         if(error) throw error
//         res.json(results)
//     })
// }

const crearVenta = (req, res) => {
    connection.query(`INSERT INTO ventas SET ?`, 
    {
        nroFactura: req.body.nroFactura,
        idEmpleado: req.body.idEmpleado,
        idCliente: req.body.idCliente,
        total: req.body.total
    }
    ,(error, results) => {
        if(error) throw error
    })

    connection.query(`INSERT INTO detalle_ventas(idVenta, idProducto, cantidad, precio)
                        SELECT idVenta, idProducto, cantidad, precio FROM detalle_ventas_temporal;
        `, 
        (error, results) => {
            if (error) throw error
    })

    connection.query('DELETE FROM detalle_ventas_temporal', (error, results) => {
        if(error) throw error
        res.json(results)
    })
}

const editarVenta = (req, res) => {
    const id = req.params.id
    const {nroFactura, idEmpleado, idCliente, total, estado} = req.body
    connection.query(`UPDATE ventas SET nroFactura=${nroFactura},
                        idEmpleado=${idEmpleado},
                        idCliente=${idCliente},
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
    })

    connection.query(`UPDATE detalle_ventas SET estado = 0 WHERE idVenta=${id}`, (error, results) => {
        if (error) throw error
        res.json(results)
    })
}

const ultimoId = (req, res) => {
    connection.query('SELECT max(idVenta) id FROM ventas', (error, results) => {
        if (error) throw error
        res.json(results)
    })
}

const seleccionarVenta = (req,res) => {
    const id = req.params.id
    connection.query(`SELECT * FROM ventas WHERE idVenta=${id} AND estado = 1`, (error, results) => {
        if (error) throw error
        res.json(results)
    })
}

module.exports = {mostrarVentas, crearVenta, borrarVenta, editarVenta, ultimoId, traerVenta, seleccionarVenta}