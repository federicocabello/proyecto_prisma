import { useState } from "react";

const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

function FerreteriaSuppliers({ suppliers, setSuppliers }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    product: "",
    cost: "",
    balance: "",
  });

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const addSupplier = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.product.trim()) return;

    setSuppliers((current) => [
      {
        id: Date.now(),
        name: form.name.trim(),
        phone: form.phone.trim() || "Sin telefono",
        balance: Number(form.balance || 0),
        products: [{ name: form.product.trim(), cost: Number(form.cost || 0) }],
      },
      ...current,
    ]);

    setForm({ name: "", phone: "", product: "", cost: "", balance: "" });
  };

  const updateCost = (supplierId, productName, cost) => {
    setSuppliers((current) =>
      current.map((supplier) => {
        if (supplier.id !== supplierId) return supplier;

        return {
          ...supplier,
          products: supplier.products.map((product) =>
            product.name === productName ? { ...product, cost: Number(cost) } : product
          ),
        };
      })
    );
  };

  const clearBalance = (supplierId) => {
    setSuppliers((current) =>
      current.map((supplier) =>
        supplier.id === supplierId ? { ...supplier, balance: 0 } : supplier
      )
    );
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Proveedores</h3>
        <p className="mt-1 text-sm text-slate-500">
          Mira que productos ofrece cada proveedor, sus precios y cuanto se le debe.
        </p>
      </div>

      <form
        onSubmit={addSupplier}
        className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-6"
      >
        <input
          value={form.name}
          onChange={(event) => updateForm("name", event.target.value)}
          placeholder="Proveedor"
          className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
        />
        <input
          value={form.phone}
          onChange={(event) => updateForm("phone", event.target.value)}
          placeholder="Telefono"
          className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
        />
        <input
          value={form.product}
          onChange={(event) => updateForm("product", event.target.value)}
          placeholder="Producto que vende"
          className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
        />
        <input
          type="number"
          min="0"
          value={form.cost}
          onChange={(event) => updateForm("cost", event.target.value)}
          placeholder="Precio compra"
          className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
        />
        <input
          type="number"
          min="0"
          value={form.balance}
          onChange={(event) => updateForm("balance", event.target.value)}
          placeholder="Cuenta pendiente"
          className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
        />
        <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] lg:col-span-6 lg:w-fit">
          Agregar proveedor
        </button>
      </form>

      <div className="grid gap-4 lg:grid-cols-2">
        {suppliers.map((supplier) => (
          <article key={supplier.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-black text-slate-950">{supplier.name}</p>
                <p className="text-sm text-slate-500">{supplier.phone}</p>
              </div>
              <span className="w-fit rounded-full bg-[#00D38E]/10 px-3 py-1 text-xs font-bold text-emerald-700">
                {supplier.products.length} productos
              </span>
            </div>

            <div className="mb-4 flex flex-col gap-3 rounded-xl bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500">Cuenta pendiente</p>
                <p className={supplier.balance > 0 ? "text-xl font-black text-amber-700" : "text-xl font-black text-emerald-700"}>
                  {supplier.balance > 0 ? currency.format(supplier.balance) : "Al dia"}
                </p>
              </div>

              {supplier.balance > 0 && (
                <button
                  type="button"
                  onClick={() => clearBalance(supplier.id)}
                  className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100"
                >
                  Marcar pagado
                </button>
              )}
            </div>

            <div className="space-y-3">
              {supplier.products.map((product) => (
                <div
                  key={product.name}
                  className="grid gap-3 rounded-xl bg-slate-50 p-3 sm:grid-cols-[1fr_160px]"
                >
                  <div>
                    <p className="text-sm font-black text-slate-950">{product.name}</p>
                    <p className="text-xs text-slate-500">Precio actual: {currency.format(product.cost)}</p>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={product.cost}
                    onChange={(event) =>
                      updateCost(supplier.id, product.name, event.target.value)
                    }
                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold outline-none focus:border-[#00D38E]"
                  />
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FerreteriaSuppliers;
