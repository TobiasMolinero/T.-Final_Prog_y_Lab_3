const {connection} = require('../database/config') 

const validarUsuario = (req, res) => {
    const {nombreUsuario, contraseña} = req.body
    connection.query(`SELECT nombreUsuario, contraseña FROM usuarios
                        WHERE nombreUsuario = '${nombreUsuario}' AND contraseña = '${contraseña}'
    `, (error, results) => {
        if(error) throw error
        if(results.length === 0){
            res.json(0)
        } else {
            res.json(1)
        }
    })
}

module.exports = {validarUsuario}