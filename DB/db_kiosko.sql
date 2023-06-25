CREATE DATABASE db_kiosko;
USE db_kiosko;  

CREATE TABLE Ventas(
idVenta INT PRIMARY KEY AUTO_INCREMENT,
nroFactura INT NOT NULL,
idEmpleado INT NOT NULL,
idCliente INT NOT NULL,
idProducto INT NOT NULL,
fecha DATE NOT NULL,
cantidad INT NOT NULL,
total DECIMAL(10, 2) NOT NULL,
borrar TINYINT(1) NOT NULL
);

CREATE TABLE Productos(
idProducto INT PRIMARY KEY AUTO_INCREMENT,
descripcion VARCHAR(50) NOT NULL,
precio DECIMAL(10,2) NOT NULL,
stock INT NOT NULL,
idCategoria INT NOT NULL,
borrar TINYINT(1) NOT NULL
);

CREATE TABLE Categorias_Productos(
idCategoriaP INT PRIMARY KEY AUTO_INCREMENT,
nombreCategoria VARCHAR(50) NOT NULL,
borrar TINYINT(1) NOT NULL
);

CREATE TABLE Empleados(
idEmpleado INT PRIMARY KEY AUTO_INCREMENT,
nombreE VARCHAR(50) NOT NULL,
apellidoE VARCHAR(50) NOT NULL,
sueldo DECIMAL(10, 2) NOT NULL,
idTurno INT NOT NULL,
borrar TINYINT(1) NOT NULL
);

CREATE TABLE Turnos(
id_turno INT PRIMARY KEY AUTO_INCREMENT,
tipo_turno VARCHAR(50) NOT NULL,
borrar TINYINT(1) NOT NULL
);

CREATE TABLE Clientes(
idCliente INT PRIMARY KEY AUTO_INCREMENT,
nombreC VARCHAR(50) NOT NULL,
apellidoC VARCHAR(50) NOT NULL,
telefono VARCHAR(50) NOT NULL,
domicilio VARCHAR(50) NOT NULL,
borrar TINYINT(1) NOT NULL
);

CREATE TABLE Usuarios(
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nombreUsuario VARCHAR(50) NOT NULL,
contraseña VARCHAR(100) NOT NULL,
borrar TINYINT(1) NOT NULL
);

ALTER TABLE Ventas
ADD CONSTRAINT fk_ventas_empleados
FOREIGN KEY (idEmpleado) REFERENCES Empleados(idEmpleado);

ALTER TABLE Ventas
ADD CONSTRAINT fk_ventas_clientes
FOREIGN KEY (idCliente) REFERENCES Clientes(idCliente);

ALTER TABLE Ventas
ADD CONSTRAINT fk_ventas_productos
FOREIGN KEY (idProducto) REFERENCES Productos(idProducto);

ALTER TABLE Productos
ADD CONSTRAINT fk_productos_categoriaProductos
FOREIGN KEY (idCategoria) REFERENCES Categorias_Productos(idCategoriaP);

ALTER TABLE empleados
ADD CONSTRAINT fk_empleados_turnos
FOREIGN KEY (idTurno) REFERENCES turnos(id_turno);

INSERT INTO Categorias_Productos(nombreCategoria, borrar) VALUES ('Bebidas', 0),('Snacks', 0),('Golosinas', 0),('Cigarrillos', 0),('Higiene Personal', 0);
SELECT * FROM Categorias_Productos;

INSERT INTO Usuarios(nombreUsuario, contraseña, borrar) VALUES ('TobiasMolinero', '123456', 0),
('AlvaroLlovera', '654321', 0),('FacundoMajolli', 'abcde', 0);
SELECT * FROM Usuarios;

INSERT INTO Turnos(tipo_turno, borrar) VALUES('mañana', 0),('tarde', 0),('noche', 0);
SELECT * FROM Turnos;

SET SQL_SAFE_UPDATES = 0;

DROP VIEW IF EXISTS traer_ventas;




