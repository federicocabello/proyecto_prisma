const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

function FerreteriaMissing({ products, setProducts }) {
  const missingProducts = products.filter(
    (product) => product.stock <= product.minStock
  );

  const addStock = (productId) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === productId
          ? { ...product, stock: product.stock + Math.max(5, product.minStock) }
          : product
      )
    );
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Faltantes</h3>
        <p className="mt-1 text-sm text-slate-500">
          Productos que necesitan reposicion para evitar perder ventas.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {missingProducts.map((product) => (
          <article key={product.id} className="rounded-2xl border border-red-100 bg-red-50/50 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="break-words font-black text-slate-950">{product.name}</p>
                <p className="mt-1 text-sm text-slate-500">{product.category}</p>
              </div>
              <span className="w-fit shrink-0 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                Stock bajo
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
              <div className="rounded-xl bg-white p-3">
                <p className="text-xs text-slate-500">Actual</p>
                <p className="font-black text-slate-950">{product.stock}</p>
              </div>
              <div className="rounded-xl bg-white p-3">
                <p className="text-xs text-slate-500">Minimo</p>
                <p className="font-black text-slate-950">{product.minStock}</p>
              </div>
              <div className="rounded-xl bg-white p-3">
                <p className="text-xs text-slate-500">Venta</p>
                <p className="font-black text-slate-950">{currency.format(product.price)}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => addStock(product.id)}
              className="cursor-pointer mt-4 w-full rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F]"
            >
              Simular reposicion
            </button>
          </article>
        ))}
      </div>

      {missingProducts.length === 0 && (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-sm font-bold text-emerald-700">
          No hay faltantes por ahora.
        </div>
      )}
    </section>
  );
}

export default FerreteriaMissing;
