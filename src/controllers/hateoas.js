const prepareHATEOAS = (productos) => {
  const HATEOAS = productos.map((p) => {
    return {
      id: p.id,
      descripcion: p.descripcion,
      descripcionDetallada: p.descripcionDetallada,
      precio_venta: p.precio_venta,
      stock_actual: p.stock_actual,
      url_fotografia: p.url_fotografia,
      categoria: p.categoria,
      usuario: {
        id: p.id_usuario,
        nombre_completo: p.nombre_completo,
      },
    };
  });

  return HATEOAS;
};

module.exports = {
  prepareHATEOAS,
};
