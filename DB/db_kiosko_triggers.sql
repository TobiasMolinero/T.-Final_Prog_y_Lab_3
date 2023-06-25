use db_kiosko;

/* Restar stock de un producto al crear una nueva venta */
DROP TRIGGER IF EXISTS restar_stock;

DELIMITER //
CREATE TRIGGER restar_stock
BEFORE INSERT 
ON ventas
FOR EACH ROW
BEGIN
	UPDATE productos SET stock = productos.stock - NEW.cantidad
    WHERE NEW.idProducto = productos.idProducto;
END //
DELIMITER ;