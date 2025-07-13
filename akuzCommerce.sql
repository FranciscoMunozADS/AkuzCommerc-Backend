-- Creación de database
CREATE DATABASE akuzCommerce;

-- Tablas

-- Tabla de categorías de productos
CREATE TABLE categoriaProductos (
  id SERIAL PRIMARY KEY,
  descripcion VARCHAR(100) NOT NULL
);

-- Tabla de productos
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  sku VARCHAR(50) NOT NULL UNIQUE,
  descripcion VARCHAR(255) NOT NULL,
  descripcionDetallada TEXT,
  precio_venta DECIMAL(10,2) NOT NULL,
  stock_actual INT NOT NULL,
  url_fotografia VARCHAR(255),
  estatus VARCHAR(50),
  id_categoria INT,
  FOREIGN KEY (id_categoria) REFERENCES categoriaProductos(id) ON DELETE CASCADE
);

-- Tabla de usuarios
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  idUsuario VARCHAR(50) UNIQUE NOT NULL,
  nombre_completo VARCHAR(100) NOT NULL,
  telefono VARCHAR(20),
  e_mail VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  url_avatar TEXT
);

-- Tabla de carro de compras
CREATE TABLE carroCompra (
  id SERIAL PRIMARY KEY,
  sku VARCHAR(50) NOT NULL,
  cantidad INT NOT NULL,
  id_usuario INT NOT NULL,
  precioVenta DECIMAL(10,2) NOT NULL,
  statusCarro VARCHAR(50),
  fecha DATE,
  hora TIME,
  FOREIGN KEY (sku) REFERENCES productos(sku) ON DELETE CASCADE,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de historial de ventas
CREATE TABLE historicoVentasUsuario (
  id SERIAL PRIMARY KEY,
  id_usuario INT NOT NULL,
  sku_producto VARCHAR(50) NOT NULL,
  cantidad_vendida INT NOT NULL,
  precio_producto DECIMAL(10,2) NOT NULL,
  fecha_compra DATE NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (sku_producto) REFERENCES productos(sku) ON DELETE CASCADE
);

-- Datos de Prueba

-- Categorías
INSERT INTO categoriaProductos (descripcion)
VALUES ('Café'), ('Ajo'), ('Otros');

-- Productos
INSERT INTO productos (sku, descripcion, descripcionDetallada, precio_venta, stock_actual, url_fotografia, estatus, id_categoria)
VALUES 
('SKU001', 'Café Premium', 'Café arábico orgánico', 6990, 50, 'cafe.jpg', 'activo', 1),
('SKU002', 'Ajo Negro', 'Ajo fermentado 100g', 25000, 30, 'ajo.jpg', 'activo', 2),
('SKU003', 'Miel Natural', 'Miel pura de abeja 1Kg', 10000, 20, 'miel.jpg', 'activo', 3);

-- Usuarios
INSERT INTO usuarios (idUsuario, nombre_completo, telefono, e_mail, password, url_avatar)
VALUES 
('user001', 'Juan Pérez', '987654321', 'juan@mail.com', 'pass123', 'avatar1.jpg'),
('user002', 'Maria Tapia', '912345678', 'maria@mail.com', 'secure456', 'avatar2.jpg');

-- Carro de compra
INSERT INTO carroCompra (sku, cantidad, id_usuario, precioVenta, statusCarro, fecha, hora)
VALUES 
('SKU001', 2, 1, 13980, 'pendiente', '2025-07-09', '15:30:00'),
('SKU003', 1, 2, 10000, 'pendiente', '2025-07-09', '16:00:00');

-- Historial de ventas
INSERT INTO historicoVentasUsuario (id_usuario, sku_producto, cantidad_vendida, precio_producto, fecha_compra)
VALUES 
(1, 'SKU001', 2, 6990, '2025-07-01'),
(2, 'SKU002', 1, 25000, '2025-07-02');

-- Agregar id_usuarios a tabla productos(no la tenia por eso salía el error de estatus en postman al agregar un producto)
ALTER TABLE productos
ADD COLUMN id_usuario INT,
ADD FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE;

-- Agregar FLAG de ADMIN en tabla usuarios
ALTER TABLE usuarios ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;

-- Cambiar el estatus del usuario Pedro Gonzales(id: 5 en mi DB) a ADMIN (este usuario se agregó por postman)
UPDATE usuarios SET is_admin = true WHERE id = 5;

-- Eliminar tablas
DROP TABLE IF EXISTS 
  historicoVentasUsuario,
  carroCompra,
  productos,
  usuarios,
  categoriaProductos
CASCADE;