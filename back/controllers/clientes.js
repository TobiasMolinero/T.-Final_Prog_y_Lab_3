const {connection} = require('../database/config')

const mostrarClientes = (req, res) => {
    connection.query('SELECT * FROM clientes WHERE estado = 1', (error, results) => {
        if(error) throw error
        res.json(results)
    })
}

const seleccionarCliente = (req, res) => {
    const id = req.params.id
    connection.query(`SELECT * FROM clientes WHERE idCliente=${id}`, (error, results) => {
        if(error) throw error
        res.json(results)
    })
}

const crearCliente = (req, res) => {
    connection.query('INSERT INTO clientes SET ?', {
        nombreC: req.body.nombreC,
        apellidoC: req.body.apellidoC,
        telefono: req.body.telefono,
        domicilio: req.body.domicilio,
        estado: req.body.estado
    }, (error, results) => {
        if(error) throw error
        res.send(results)
    })
}

const editarCliente = (req, res) => {
    const id = req.params.id
    const {nombreC, apellidoC, telefono, domicilio, estado} = req.body
    connection.query(`UPDATE clientes SET nombreC='${nombreC}', 
                        apellidoC='${apellidoC}', 
                        telefono='${telefono}',
                        domicilio='${domicilio}',
                        estado=${estado}
                        WHERE idCLiente=${id}
    `,(error, results) => {
        if(error) throw error
        res.send(results)
        }
    )
}

const borrarCliente = (req, res) => {
    const id = req.params.id
    connection.query(`UPDATE clientes SET estado = 0 WHERE idCliente = ${id}`, (error, results) => {
        if(error){
            throw error
        } else {
            res.send(results)
        }
    })
}

module.exports = {mostrarClientes, seleccionarCliente, crearCliente, editarCliente, borrarCliente}