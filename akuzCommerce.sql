-- Creación de database
CREATE DATABASE akuzCommerce;

-- Tablas

-- Tabla de categorías de productos
CREATE TABLE categoriaProductos (
  id SERIAL PRIMARY KEY,
  descripcion VARCHAR(100) NOT NULL
);

-- Tabla de usuarios
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  idUsuario VARCHAR(50) UNIQUE NOT NULL,
  nombre_completo VARCHAR(100) NOT NULL,
  telefono VARCHAR(20),
  e_mail VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  url_avatar TEXT,
  is_admin BOOLEAN DEFAULT FALSE
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
  id_usuario INT,
  FOREIGN KEY (id_categoria) REFERENCES categoriaProductos(id) ON DELETE CASCADE,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
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
);

-- Datos de Prueba

-- Categorías
INSERT INTO categoriaProductos (descripcion)
VALUES 
  ('Café'),
  ('Ajo'),
  ('Otros');

-- Usuarios
-- User Admin => juan@mail.com ; pass123
INSERT INTO usuarios (idUsuario, nombre_completo, telefono, e_mail, password, url_avatar, is_admin)
VALUES 
  ('user001', 'Juan Pérez', '987654321', 'juan@mail.com', '$2a$12$iTfNMeLpetYVh0XYh/6VHuYdqi6FuAE/7SgWtZ.7Dn4NIIDqgS9gy', 'https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg', TRUE),
  ('user002', 'Maria Tapia', '912345678', 'maria@mail.com', '$2a$12$ooSIHLohhHuhasm8Q.nM7eYGUTj0pQiAjtI8W3Nr8Df79vXxhWnsi', 'https://www.w3schools.com/w3images/avatar6.png', FALSE);

-- Productos (asociados al usuario 1 — Juan Pérez)
INSERT INTO productos (sku, descripcion, descripcionDetallada, precio_venta, stock_actual, url_fotografia, estatus, id_categoria, id_usuario)
VALUES 
  ('SKU001', 'Café Premium', 'Café arábico orgánico', 6990, 50, 'https://walmartsv.vtexassets.com/arquivos/ids/614391/87399_01.jpg?v=638682502152130000', 'activo', 1, 1),
  ('SKU002', 'Ajo Negro', 'Ajo fermentado 100g', 25000, 30, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb_pUGzJxXiBrIGtJ8w6CepuxHBKtd8zxvMw&s', 'activo', 2, 1),
  ('SKU003', 'Miel Natural', 'Miel pura de abeja 1Kg', 10000, 20, 'https://media.istockphoto.com/id/155308208/es/foto/miel.jpg?s=612x612&w=0&k=20&c=syb40kUwYliK9Ak-rj04AMwTCc4Nx6dzqUAk5h4hCV0=', 'activo', 3, 1);

-- Carro de compras (usuarios 1 y 2 comprando productos)
INSERT INTO carroCompra (sku, cantidad, id_usuario, precioVenta, statusCarro, fecha, hora)
VALUES 
  ('SKU001', 2, 1, 13980, 'pendiente', '2025-07-09', '15:30:00'),
  ('SKU003', 1, 2, 10000, 'pendiente', '2025-07-09', '16:00:00');

-- Historial de ventas (simulación de ventas pasadas)
INSERT INTO historicoVentasUsuario (id_usuario, sku_producto, cantidad_vendida, precio_producto, fecha_compra)
VALUES 
  (1, 'SKU001', 2, 6990, '2025-07-01'),
  (2, 'SKU002', 1, 25000, '2025-07-02');

-- Eliminar tablas
DROP TABLE IF EXISTS 
  historicoVentasUsuario,
  carroCompra,
  productos,
  usuarios,
  categoriaProductos
CASCADE;

select * from productos