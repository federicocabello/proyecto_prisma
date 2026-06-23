import { useMemo, useState } from "react";

const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const emptyForm = {
  name: "",
  category: "",
  stock: "",
  minStock: "",
  costPrice: "",
  profitPercent: "",
  price: "",
};

const calculateFinalPrice = (costPrice, profitPercent) =>
  Math.round(Number(costPrice || 0) * (1 + Number(profitPercent || 0) / 100));

const calculateProfitPercent = (costPrice, finalPrice) => {
  const cost = Number(costPrice || 0);
  const price = Number(finalPrice || 0);

  if (!cost) return 0;
  return Math.round(((price - cost) / cost) * 100);
};

function FerreteriaProducts({ products, setProducts, compact = false }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const categories = useMemo(
    () => ["Todas", ...new Set(products.map((product) => product.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = `${product.name} ${product.category}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = category === "Todas" || product.category === category;
      const matchesStock = !showLowStockOnly || product.stock <= product.minStock;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [category, products, search, showLowStockOnly]);

  const lowStockProducts = products.filter(
    (product) => product.stock <= product.minStock
  );
  const lowStockCount = lowStockProducts.length;

  const updateForm = (field, value) => {
    setForm((current) => {
      const next = { ...current, [field]: value };

      if (field === "costPrice" || field === "profitPercent") {
        next.price = String(calculateFinalPrice(next.costPrice, next.profitPercent));
      }

      if (field === "price") {
        next.price = String(Math.round(Number(value || 0)));
        next.profitPercent = String(calculateProfitPercent(next.costPrice, next.price));
      }

      return next;
    });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const saveProduct = (event) => {
    event.preventDefault();

    const nextProduct = {
      id: editingId ?? Date.now(),
      name: form.name.trim(),
      category: form.category.trim(),
      stock: Number(form.stock),
      minStock: Number(form.minStock),
      costPrice: Math.round(Number(form.costPrice || 0)),
      profitPercent: Math.round(Number(form.profitPercent || 0)),
      price: Math.round(Number(form.price || 0)),
    };

    if (!nextProduct.name || !nextProduct.category) return;

    setProducts((current) => {
      if (editingId) {
        return current.map((product) =>
          product.id === editingId ? nextProduct : product
        );
      }

      return [nextProduct, ...current];
    });

    resetForm();
  };

  const editProduct = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      stock: String(product.stock),
      minStock: String(product.minStock),
      costPrice: String(product.costPrice ?? Math.round(product.price * 0.68)),
      profitPercent: String(product.profitPercent ?? 47),
      price: String(product.price),
    });
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-black text-slate-950">
            {compact ? "Buscar productos" : "Productos e inventario"}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {compact
              ? "Consulta precio, stock y estado del producto antes de vender."
              : "Agrega productos, modifica precios y controla el stock disponible."}
          </p>
        </div>
      </div>

      {!compact && (
        <button
          type="button"
          onClick={() => {
            setShowLowStockOnly(true);
            setSearch("");
            setCategory("Todas");
          }}
          className={`cursor-pointer mb-6 w-full rounded-2xl border p-4 text-left transition ${
            lowStockCount
              ? "border-amber-200 bg-amber-50 hover:border-amber-300"
              : "border-emerald-200 bg-[#00D38E]/10"
          }`}
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p
                className={`text-sm font-black uppercase tracking-[0.12em] ${
                  lowStockCount ? "text-amber-700" : "text-emerald-700"
                }`}
              >
                Alerta de stock
              </p>
              <p className="mt-1 text-xl font-black text-slate-950">
                {lowStockCount
                  ? `${lowStockCount} productos necesitan reposicion`
                  : "No hay productos bajos en stock"}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                {lowStockCount
                  ? "Toca aca para verlos abajo y modificar stock, minimo o precio."
                  : "El inventario esta dentro de los niveles configurados."}
              </p>
            </div>

            <span className="shrink-0 rounded-xl bg-white px-4 py-2 text-sm font-black text-slate-950">
              Ver stock bajo
            </span>
          </div>
        </button>
      )}

      {!compact && (
        <form
          onSubmit={saveProduct}
          className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-6"
        >
          <input
            value={form.name}
            onChange={(event) => updateForm("name", event.target.value)}
            placeholder="Producto"
            className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2"
          />
          <input
            value={form.category}
            onChange={(event) => updateForm("category", event.target.value)}
            placeholder="Categoria"
            className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
          />
          <input
            type="number"
            min="0"
            value={form.stock}
            onChange={(event) => updateForm("stock", event.target.value)}
            placeholder="Stock"
            className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
          />
          <input
            type="number"
            min="0"
            value={form.minStock}
            onChange={(event) => updateForm("minStock", event.target.value)}
            placeholder="Minimo"
            className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
          />
          <input
            type="number"
            min="0"
            value={form.costPrice}
            onChange={(event) => updateForm("costPrice", event.target.value)}
            placeholder="Precio costo"
            className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
          />
          <input
            type="number"
            min="0"
            value={form.profitPercent}
            onChange={(event) => updateForm("profitPercent", event.target.value)}
            placeholder="% ganancia"
            className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
          />
          <input
            type="number"
            min="0"
            value={form.price}
            onChange={(event) => updateForm("price", event.target.value)}
            placeholder="Precio final"
            className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
          />

          <div className="flex gap-2 lg:col-span-6">
            <button className="cursor-pointer flex-1 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] md:flex-none">
              {editingId ? "Guardar cambios" : "Agregar producto"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="cursor-pointer rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      )}

      <div className="mb-5 grid gap-3 lg:grid-cols-[1fr_220px_160px]">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar producto o categoria"
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#00D38E] focus:bg-white"
        />

        <select
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
            setShowLowStockOnly(false);
          }}
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#00D38E] focus:bg-white"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="rounded-2xl bg-[#00D38E]/10 px-4 py-3 text-sm font-black text-emerald-700">
          {filteredProducts.length} productos · {lowStockCount} bajos
        </div>
      </div>

      {showLowStockOnly && (
        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-bold text-amber-800">
            Mostrando solo productos bajos en stock.
          </p>
          <button
            type="button"
            onClick={() => setShowLowStockOnly(false)}
            className="cursor-pointer rounded-xl bg-white px-4 py-2 text-sm font-black text-slate-700"
          >
            Ver todos
          </button>
        </div>
      )}

      <div className="grid gap-3 md:hidden">
        {filteredProducts.map((product) => {
          const isLow = product.stock <= product.minStock;

          return (
            <article key={product.id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="break-words font-black text-slate-950">{product.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{product.category}</p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                    isLow
                      ? "bg-red-100 text-red-700"
                      : "bg-[#00D38E]/10 text-emerald-700"
                  }`}
                >
                  {isLow ? "Stock bajo" : "Disponible"}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Stock</p>
                  <p className="font-black text-slate-950">{product.stock}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Minimo</p>
                  <p className="font-black text-slate-950">{product.minStock}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Costo</p>
                  <p className="font-black text-slate-950">{currency.format(product.costPrice ?? product.price * 0.68)}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">% ganancia</p>
                  <p className="font-black text-slate-950">{product.profitPercent ?? 47}%</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Final</p>
                  <p className="font-black text-slate-950">{currency.format(product.price)}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => editProduct(product)}
                className="cursor-pointer mt-4 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700"
              >
                Modificar
              </button>
            </article>
          );
        })}
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-4 font-bold">Producto</th>
                <th className="px-5 py-4 font-bold">Categoria</th>
                <th className="px-5 py-4 font-bold">Stock</th>
                <th className="px-5 py-4 font-bold">Minimo</th>
                <th className="px-5 py-4 font-bold">Precio costo</th>
                <th className="px-5 py-4 font-bold">% ganancia</th>
                <th className="px-5 py-4 font-bold">Precio final</th>
                <th className="px-5 py-4 font-bold">Estado</th>
                <th className="px-5 py-4 font-bold">Accion</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((product) => {
                const isLow = product.stock <= product.minStock;

                return (
                  <tr key={product.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-bold text-slate-900">
                      {product.name}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{product.category}</td>
                    <td className="px-5 py-4 text-slate-600">{product.stock}</td>
                    <td className="px-5 py-4 text-slate-600">{product.minStock}</td>
                    <td className="px-5 py-4 font-bold text-slate-900">
                      {currency.format(product.costPrice ?? product.price * 0.68)}
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-900">
                      {product.profitPercent ?? 47}%
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-900">
                      {currency.format(product.price)}
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
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => editProduct(product)}
                        className="cursor-pointer rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                      >
                        Modificar
                      </button>
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
