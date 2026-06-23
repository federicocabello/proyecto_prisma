import { useState } from "react";

const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

function FerreteriaQuotes({ products, clients, quotes, setQuotes, setOrders }) {
  const [form, setForm] = useState({
    customer: clients[0]?.name ?? "",
    productId: products[0]?.id ?? "",
    quantity: 1,
    discount: 0,
  });

  const product = products.find((item) => item.id === Number(form.productId));
  const subtotal = (product?.price ?? 0) * Number(form.quantity || 0);
  const total = Math.max(0, subtotal - subtotal * (Number(form.discount || 0) / 100));

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const createQuote = (event) => {
    event.preventDefault();
    if (!product) return;

    setQuotes((current) => [
      {
        id: `PR-${300 + current.length + 1}`,
        customer: form.customer,
        detail: `${form.quantity} x ${product.name}`,
        unitPrice: product.price,
        discount: Number(form.discount || 0),
        total,
      },
      ...current,
    ]);

    setForm((current) => ({ ...current, quantity: 1, discount: 0 }));
  };

  const createOrder = (quote) => {
    setOrders((current) => [
      {
        id: `P-${110 + current.length}`,
        customer: quote.customer,
        detail: quote.detail,
        status: "Pendiente",
        total: quote.total,
      },
      ...current,
    ]);
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Presupuestos</h3>
        <p className="mt-1 text-sm text-slate-500">
          Arma presupuestos desde productos cargados y aplica descuentos.
        </p>
      </div>

      <form
        onSubmit={createQuote}
        className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-6"
      >
        <select
          value={form.customer}
          onChange={(event) => updateForm("customer", event.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2"
        >
          {clients.map((client) => (
            <option key={client.id} value={client.name}>
              {client.name}
            </option>
          ))}
        </select>

        <select
          value={form.productId}
          onChange={(event) => updateForm("productId", event.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2"
        >
          {products.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <label className="grid gap-1">
          <span className="px-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
            Cantidad
          </span>
          <input
            type="number"
            min="1"
            value={form.quantity}
            onChange={(event) => updateForm("quantity", event.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
          />
        </label>

        <label className="grid gap-1">
          <span className="px-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
            Descuento %
          </span>
          <input
            type="number"
            min="0"
            max="100"
            value={form.discount}
            onChange={(event) => updateForm("discount", event.target.value)}
            placeholder="0"
            className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
          />
        </label>

        <div className="rounded-xl bg-white px-3 py-3 text-sm font-black text-slate-950 lg:col-span-3">
          Precio final unitario: {currency.format(product?.price ?? 0)}
        </div>

        <div className="rounded-xl bg-white px-3 py-3 text-sm font-black text-slate-950 lg:col-span-3">
          Total presupuesto: {currency.format(total)}
        </div>

        <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] lg:col-span-6">
          Crear presupuesto
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2">
        {quotes.map((quote) => (
          <article key={quote.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-black text-slate-400">{quote.id}</p>
                <p className="mt-1 break-words font-black text-slate-950">{quote.customer}</p>
                <p className="mt-1 break-words text-sm text-slate-500">{quote.detail}</p>
                <p className="mt-1 text-sm font-bold text-slate-700">
                  Precio final unitario: {currency.format(quote.unitPrice ?? 0)}
                </p>
              </div>
              <p className="shrink-0 text-xl font-black text-slate-950 sm:text-right">{currency.format(quote.total)}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                Descuento {quote.discount}%
              </span>
              <button
                type="button"
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-500"
              >
                Generar PDF
              </button>
              <button
                type="button"
                onClick={() => createOrder(quote)}
                className="cursor-pointer rounded-full bg-[#00D38E]/10 px-3 py-1 text-xs font-bold text-emerald-700"
              >
                Pasar a pedido
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FerreteriaQuotes;
