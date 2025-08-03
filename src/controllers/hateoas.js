const prepareHATEOAS = (productos) => {
  const HATEOAS = productos.map((p) => {
    return {
      id: p.id,
      descripcion: p.descripcion,
      descripciondetallada: p.descripciondetallada,
      precio_venta: p.precio_venta,
      stock_actual: p.stock_actual,
      url_fotografia: p.url_fotografia,
      categoria: p.categoria,
      usuario: {
        id : p.idusuario,
        name: p.nombreusuario
      }
    };
  });

  return HATEOAS;
};

module.exports = {
  prepareHATEOAS,
};
