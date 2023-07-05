/* Traer las ventas con los detalles de las otras tablas*/
DROP VIEW IF EXISTS traer_ventas;
DROP VIEW IF EXISTS traer_productos;
DROP VIEW IF EXISTS traer_empleados;
DROP VIEW IF EXISTS traer_detalle_temp;

CREATE VIEW traer_ventas AS
SELECT  v.idVenta, v.nroFactura, e.nombreE, e.apellidoE, c.nombreC, c.apellidoC, v.total FROM ventas v
INNER JOIN empleados e
ON v.idEmpleado = e.idEmpleado
INNER JOIN clientes c
ON v.idCliente = c.idCliente
WHERE v.estado = 1;

/* Traer productos con el nombre de la categoria */
CREATE VIEW traer_productos AS
SELECT P.idProducto, P.descripcion, P.precio, P.stock, CP.nombreCategoria FROM productos P
INNER JOIN categorias_productos CP
ON P.idCategoria = CP.idCategoriaP
WHERE P.estado = 1;

/* Traer empleados con la descripcion del turno */
CREATE VIEW traer_empleados AS
SELECT E.idEmpleado, E.nombreE, E.apellidoE, E.sueldo, T.tipo_turno FROM empleados E
INNER JOIN turnos T
ON E.idTurno = T.id_turno
WHERE E.estado = 1;

/* traer detalle ventas temporal */
CREATE VIEW traer_detalle_temp AS
SELECT d.idDetalleVenta, p.descripcion, d.cantidad, d.precio, d.subTotal FROM detalle_ventas_temporal d
INNER JOIN productos p
ON d.idProducto = p.idProducto
WHERE p.estado = 1;

/* traer detalle venta definitivo */
/*CREATE VIEW traer_detalle_def AS*/
SELECT d.idVenta, p.descripcion, d.cantidad, d.precio, d.subTotal FROM detalle_ventas d
INNER JOIN productos p
ON d.idProducto = p.idProducto
WHERE d.estado = 1 AND d.idVenta = ?;