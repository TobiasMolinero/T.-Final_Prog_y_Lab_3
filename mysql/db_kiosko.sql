DROP DATABASE db_kiosco;

CREATE DATABASE db_kiosco;
USE db_kiosco;  

CREATE TABLE Ventas(
idVenta INT PRIMARY KEY AUTO_INCREMENT,
nroFactura INT NOT NULL,
idEmpleado INT NOT NULL,
idCliente INT NOT NULL,
total DECIMAL(10, 2) DEFAULT 0 NOT NULL,
estado TINYINT(1) DEFAULT 1 NOT NULL
);

CREATE TABLE detalle_ventas(
idDetalleVenta INT PRIMARY KEY AUTO_INCREMENT,
idVenta INT NOT NULL,
idProducto INT NOT NULL,
cantidad INT NOT NULL,
precio DECIMAL(10,2) NOT NULL,
subTotal DECIMAL (10,2) GENERATED ALWAYS AS(cantidad * precio),
estado TINYINT(1) default 1
);

CREATE TABLE detalle_ventas_temporal(
idDetalleVenta INT PRIMARY KEY AUTO_INCREMENT,
idVenta INT NOT NULL,
idProducto INT NOT NULL,
cantidad INT NOT NULL,
precio DECIMAL(10,2) NOT NULL,
subTotal DECIMAL (10,2) GENERATED ALWAYS AS(cantidad * precio)
);

CREATE TABLE Productos(
idProducto INT PRIMARY KEY AUTO_INCREMENT,
descripcion VARCHAR(50) NOT NULL,
precio DECIMAL(10,2) NOT NULL,
stock INT NOT NULL,
idCategoria INT NOT NULL,
estado TINYINT(1) NOT NULL
);

CREATE TABLE Categorias_Productos(
idCategoriaP INT PRIMARY KEY AUTO_INCREMENT,
nombreCategoria VARCHAR(50) NOT NULL,
estado TINYINT(1) NOT NULL
);

CREATE TABLE Empleados(
idEmpleado INT PRIMARY KEY AUTO_INCREMENT,
nombreE VARCHAR(50) NOT NULL,
apellidoE VARCHAR(50) NOT NULL,
sueldo DECIMAL(10, 2) NOT NULL,
idTurno INT NOT NULL,
estado TINYINT(1) NOT NULL
);

CREATE TABLE Turnos(
id_turno INT PRIMARY KEY AUTO_INCREMENT,
tipo_turno VARCHAR(50) NOT NULL,
estado TINYINT(1) NOT NULL
);

CREATE TABLE Clientes(
idCliente INT PRIMARY KEY AUTO_INCREMENT,
nombreC VARCHAR(50) NOT NULL,
apellidoC VARCHAR(50) NOT NULL,
telefono VARCHAR(50) NOT NULL,
domicilio VARCHAR(50) NOT NULL,
estado TINYINT(1) NOT NULL
);

CREATE TABLE Usuarios(
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nombreUsuario VARCHAR(50) NOT NULL,
contraseña VARCHAR(100) NOT NULL,
estado TINYINT(1) NOT NULL
);

alter table ventas
add constraint fk_ventas_clientes
foreign key (idCliente) references clientes(idCliente);

alter table ventas 
add constraint fk_ventas_empleados
foreign key (idEmpleado) references empleados(idEmpleado);

alter table detalle_ventas
add constraint fk_detalleVentas_ventas
foreign key (idVenta) references ventas(idVenta);

alter table detalle_ventas
add constraint fk_detalleVentas_productos
foreign key (idProducto) references productos(idProducto);

ALTER TABLE Productos
ADD CONSTRAINT fk_productos_categoriaProductos
FOREIGN KEY (idCategoria) REFERENCES Categorias_Productos(idCategoriaP);

INSERT INTO Categorias_Productos(nombreCategoria, estado) VALUES ('Bebidas', 1),('Snacks', 1),('Golosinas', 1),('Cigarrillos', 1),('Higiene Personal', 1);
SELECT * FROM Categorias_Productos;

INSERT INTO Usuarios(nombreUsuario, contraseña, estado) VALUES ('TobiasMolinero', '123456', 1),
('AlvaroLlovera', '654321', 1),('FacundoMajolli', 'abcde', 1);
SELECT * FROM Usuarios;

INSERT INTO Turnos(tipo_turno, estado) VALUES('Mañana', 1),('Tarde', 1),('Noche', 1);
SELECT * FROM Turnos;

INSERT INTO empleados(nombreE, apellidoE, sueldo, idTurno, estado)
VALUES ('Tobias', 'Molinero', 21000, 1, 1),('Facundo', 'Majolli', 21000, 2, 1),('Alvaro', 'Llovera', 21000, 3, 1);
SELECT * FROM empleados;

INSERT INTO clientes(nombreC, apellidoC, telefono, domicilio,estado) 
VALUES ('Pedro', 'Pascal', 3815999999, 'Gral. Paz 584',1),('Roberto', 'Sanchez', 3815111111, 'Laprida 200',1),('Manuel', 'Courel', 3815333333, 'San Martin 794',1);
SELECT * FROM clientes;

INSERT INTO productos(idProducto,descripcion,precio,stock,idCategoria,estado)
VALUES
(1,"Alfajor Aguila 70g",300.00,20,3,1),
(2,"Papas Lays 500g",500.00,15,2,1),
(3,"Coca-Cola 500ml",300.00,20,1,1),
(4,"Pepsi 500ml",280.00,15,1,1),
(5,"Block 38g",200.00,20,3,1),
(6,"Cerveza Quilmes rubia 1lt",428.00,10,1,1),
(7,"Conos 3D 400g ",300.00,15,2,1),
(8,"Barra Cofler mani 100g",600.00,15,3,1),
(9,"Coca-Cola 3lts",900.00,15,1,1),
(10,"Pepsi 3lts",850.00,10,1,1),
(11,"Cheetos 100g",400.00,15,2,1),
(12,"Doritos 100g",500.00,15,2,1),
(13,"Mani Pehuamar",320.00,15,2,1),
(14,"Alfajor Fantoche triple negro",160.00,15,3,1),
(15,"Marlboro Red 20",720.00,15,4,1),
(16,"Phillip Morris 20",630.00,15,4,1),
(17,"Pier 20",530.00,15,4,1),
(18,"Camel 20",630.00,15,4,1),
(19,"Galletas Pepitos 119g",300.00,20,3,1);
select * from productos;

INSERT INTO ventas(nroFactura, idEmpleado, idCliente, total, estado)
VALUES(0, 1, 1, 1, 0);
SELECT * FROM ventas;

SET SQL_SAFE_UPDATES = 0;

