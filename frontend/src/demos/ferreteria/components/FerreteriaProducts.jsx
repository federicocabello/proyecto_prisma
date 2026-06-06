const products = [
  {
    name: "Martillo profesional",
    category: "Herramientas",
    stock: 24,
    minStock: 8,
    price: "$15.99",
  },
  {
    name: "Taladro eléctrico",
    category: "Herramientas eléctricas",
    stock: 6,
    minStock: 5,
    price: "$89.99",
  },
  {
    name: "Caja de tornillos",
    category: "Ferretería general",
    stock: 42,
    minStock: 12,
    price: "$7.50",
  },
  {
    name: "Cinta métrica",
    category: "Medición",
    stock: 3,
    minStock: 10,
    price: "$5.99",
  },
];

function FerreteriaProducts() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-black text-slate-950">
            Productos e inventario
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Control de stock, precios y alertas de reposición.
          </p>
        </div>

        <button className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F]">
          Nuevo producto
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-4 font-bold">Producto</th>
                <th className="px-5 py-4 font-bold">Categoría</th>
                <th className="px-5 py-4 font-bold">Stock</th>
                <th className="px-5 py-4 font-bold">Mínimo</th>
                <th className="px-5 py-4 font-bold">Precio</th>
                <th className="px-5 py-4 font-bold">Estado</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {products.map((product) => {
                const isLow = product.stock <= product.minStock;

                return (
                  <tr key={product.name} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-bold text-slate-900">
                      {product.name}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {product.category}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {product.stock}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {product.minStock}
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-900">
                      {product.price}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          isLow
                            ? "bg-red-100 text-red-700"
                            : "bg-[#00D38E]/10 text-emerald-700"
                        }`}
                      >
                        {isLow ? "Stock bajo" : "Disponible"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default FerreteriaProducts;