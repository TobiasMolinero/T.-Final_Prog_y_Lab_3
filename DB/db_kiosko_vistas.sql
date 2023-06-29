/* Traer las ventas con los detalles de las otras tablas*/
DROP VIEW IF EXISTS traer_ventas;

CREATE VIEW traer_ventas AS 
SELECT V.idVenta, V.nroFactura, V.cantidad, V.fecha, V.total, E.nombreE, E.apellidoE, C.nombreC, C.apellidoC, P.descripcion, P.precio FROM ventas V
INNER JOIN empleados E
ON V.idEmpleado = E.idEmpleado
INNER JOIN clientes C
ON V.idCliente = C.idCliente
INNER JOIN productos P
ON V.idProducto = P.idProducto
WHERE V.estado = 1;

/* Traer productos con el nombre de la categoria */
DROP VIEW IF EXISTS traer_productos;

CREATE VIEW traer_productos AS
SELECT P.idProducto, P.descripcion, P.precio, P.stock, CP.nombreCategoria FROM productos P
INNER JOIN categorias_productos CP
ON P.idCategoria = CP.idCategoriaP
WHERE P.estado = 1;


/* Traer empleados con la descripcion del turno */
DROP VIEW IF EXISTS traer_empleados;

CREATE VIEW traer_empleados AS
SELECT E.idEmpleado, E.nombreE, E.apellidoE, E.sueldo, T.tipo_turno FROM empleados E
INNER JOIN turnos T
ON E.idTurno = T.id_turno
WHERE E.estado = 1;
