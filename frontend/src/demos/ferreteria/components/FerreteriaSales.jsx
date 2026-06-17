import { useMemo, useState } from "react";

const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const statusClasses = {
  Pagado: "bg-[#00D38E]/10 text-emerald-700",
  Pendiente: "bg-amber-100 text-amber-700",
  "Vence pronto": "bg-sky-100 text-sky-700",
};

const dayLabels = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

function BarChart({ data, valueKey, color = "bg-[#00D38E]" }) {
  const maxValue = Math.max(...data.map((item) => item[valueKey]), 1);

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.label} className="grid grid-cols-[36px_1fr] items-center gap-x-3 gap-y-1 text-sm sm:grid-cols-[44px_1fr_92px]">
          <span className="font-bold text-slate-500">{item.label}</span>
          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${color}`}
              style={{ width: `${Math.max(8, (item[valueKey] / maxValue) * 100)}%` }}
            />
          </div>
          <span className="col-start-2 text-left font-black text-slate-950 sm:col-start-auto sm:text-right">
            {currency.format(item[valueKey])}
          </span>
        </div>
      ))}
    </div>
  );
}

function SaleCard({ sale, onMarkPaid }) {
  return (
    <article className="rounded-2xl border border-slate-200 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-black text-slate-400">{sale.id}</p>
          <p className="mt-1 font-black text-slate-950">{sale.customer}</p>
          <p className="mt-1 text-sm text-slate-500">{sale.items}</p>
        </div>

        <p className="text-xl font-black text-slate-950">
          {currency.format(sale.total)}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          {sale.date}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          {sale.method}
        </span>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClasses[sale.status]}`}>
          {sale.status}
        </span>
      </div>

      {sale.status !== "Pagado" && onMarkPaid && (
        <button
          type="button"
          onClick={() => onMarkPaid(sale.id)}
          className="cursor-pointer mt-4 rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F]"
        >
          Marcar como pagado
        </button>
      )}
    </article>
  );
}

function FerreteriaSales({
  view = "resumen",
  sales,
  setSales,
  products,
  setProducts,
  clients,
  quickOnly = false,
}) {
  const [saleForm, setSaleForm] = useState({
    customer: "Venta mostrador",
    productId: products[0]?.id ?? "",
    quantity: 1,
    method: "Efectivo",
    status: "Pagado",
  });

  const selectedProduct = products.find(
    (product) => product.id === Number(saleForm.productId)
  );

  const pendingSales = sales.filter((sale) => sale.status !== "Pagado");

  const reports = useMemo(() => {
    const total = sales.reduce((sum, sale) => sum + sale.total, 0);
    const cost = sales.reduce((sum, sale) => sum + (sale.cost ?? sale.total * 0.68), 0);

    return [
      { month: "Abril", sales: 1510000, profit: 438000, orders: 174 },
      { month: "Mayo", sales: 1890000, profit: 566000, orders: 216 },
      {
        month: "Junio",
        sales: total,
        profit: Math.max(0, total - cost),
        orders: sales.length,
      },
    ];
  }, [sales]);

  const dailyReports = useMemo(() => {
    return dayLabels.map((day) => {
      const daySales = sales.filter((sale) => sale.day === day);
      const total = daySales.reduce((sum, sale) => sum + sale.total, 0);
      const cost = daySales.reduce(
        (sum, sale) => sum + (sale.cost ?? sale.total * 0.68),
        0
      );

      return {
        label: day,
        sales: total,
        profit: Math.max(0, total - cost),
      };
    });
  }, [sales]);

  const updateSaleForm = (field, value) => {
    setSaleForm((current) => ({ ...current, [field]: value }));
  };

  const registerSale = (event) => {
    event.preventDefault();
    if (!selectedProduct) return;

    const quantity = Math.max(1, Number(saleForm.quantity));
    const total = selectedProduct.price * quantity;
    const estimatedCost = Math.round(total * 0.68);

    setSales((current) => [
      {
        id: `V-${2050 + current.length}`,
        customer: saleForm.customer,
        total,
        cost: estimatedCost,
        method: saleForm.method,
        status: saleForm.status,
        date: "Ahora",
        day: dayLabels[new Date().getDay() % dayLabels.length],
        items: `${quantity} x ${selectedProduct.name}`,
      },
      ...current,
    ]);

    setProducts((current) =>
      current.map((product) =>
        product.id === selectedProduct.id
          ? { ...product, stock: Math.max(0, product.stock - quantity) }
          : product
      )
    );

    setSaleForm((current) => ({ ...current, quantity: 1 }));
  };

  const markPaid = (saleId) => {
    setSales((current) =>
      current.map((sale) =>
        sale.id === saleId ? { ...sale, status: "Pagado", method: "Cobrado" } : sale
      )
    );
  };

  if (view === "reportes") {
    const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
    const totalCost = sales.reduce(
      (sum, sale) => sum + (sale.cost ?? sale.total * 0.68),
      0
    );
    const totalProfit = Math.max(0, totalSales - totalCost);
    const monthData = reports.map((report) => ({
      label: report.month.slice(0, 3),
      sales: report.sales,
      profit: report.profit,
    }));

    return (
      <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-black text-slate-950">
            Reportes de ventas
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Ventas por dia, ventas por mes y ganancia estimada del negocio.
          </p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm font-bold text-slate-500">Ventas totales</p>
            <p className="mt-2 text-2xl font-black text-slate-950">
              {currency.format(totalSales)}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm font-bold text-slate-500">Ganancia estimada</p>
            <p className="mt-2 text-2xl font-black text-emerald-700">
              {currency.format(totalProfit)}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm font-bold text-slate-500">Pendiente de cobro</p>
            <p className="mt-2 text-2xl font-black text-amber-700">
              {currency.format(pendingSales.reduce((sum, sale) => sum + sale.total, 0))}
            </p>
          </article>
        </div>

        <div className="mb-6 grid gap-4 xl:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="mb-4 font-black text-slate-950">Ventas por dia</p>
            <BarChart data={dailyReports} valueKey="sales" />
          </article>

          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="mb-4 font-black text-slate-950">Ganancias por dia</p>
            <BarChart data={dailyReports} valueKey="profit" color="bg-slate-950" />
          </article>

          <article className="rounded-2xl border border-slate-200 p-5 xl:col-span-2">
            <p className="mb-4 font-black text-slate-950">Ventas por mes</p>
            <BarChart data={monthData} valueKey="sales" />
          </article>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {reports.map((report) => (
            <article key={report.month} className="rounded-2xl border border-slate-200 p-5">
              <p className="font-black text-slate-950">{report.month}</p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">Ventas</span>
                  <span className="font-black text-slate-950">
                    {currency.format(report.sales)}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">Ganancia estimada</span>
                  <span className="font-black text-emerald-700">
                    {currency.format(report.profit)}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">Operaciones</span>
                  <span className="font-black text-slate-950">{report.orders}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (view === "cobranzas") {
    return (
      <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-black text-slate-950">
            Cobranzas pendientes
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Clientes con pagos por confirmar o cuenta corriente activa.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {pendingSales.map((sale) => (
            <SaleCard key={sale.id} sale={sale} onMarkPaid={markPaid} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">
          {quickOnly ? "Venta rapida" : view === "ventas" ? "Registrar ventas" : "Ventas recientes"}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {quickOnly
            ? "Carga una venta de mostrador y descuenta stock al instante."
            : "Vende directo de mostrador o asigna la venta a un cliente si hace falta."}
        </p>
      </div>

      {(view === "ventas" || quickOnly) && (
        <form
          onSubmit={registerSale}
          className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-6"
        >
          <select
            value={saleForm.customer}
            onChange={(event) => updateSaleForm("customer", event.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2"
          >
            <option value="Venta mostrador">Venta mostrador</option>
            {clients.map((client) => (
              <option key={client.id} value={client.name}>
                {client.name}
              </option>
            ))}
          </select>

          <select
            value={saleForm.productId}
            onChange={(event) => updateSaleForm("productId", event.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2"
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} · Stock {product.stock}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            value={saleForm.quantity}
            onChange={(event) => updateSaleForm("quantity", event.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
          />

          <select
            value={saleForm.status}
            onChange={(event) => updateSaleForm("status", event.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
          >
            <option>Pagado</option>
            <option>Pendiente</option>
            <option>Vence pronto</option>
          </select>

          <select
            value={saleForm.method}
            onChange={(event) => updateSaleForm("method", event.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2"
          >
            <option>Efectivo</option>
            <option>Mercado Pago</option>
            <option>Transferencia</option>
            <option>Tarjeta</option>
            <option>Cuenta corriente</option>
          </select>

          <div className="rounded-xl bg-white px-3 py-3 text-sm font-black text-slate-950 lg:col-span-2">
            Total: {currency.format((selectedProduct?.price ?? 0) * Number(saleForm.quantity || 0))}
          </div>

          <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] lg:col-span-2">
            Registrar venta
          </button>
        </form>
      )}

      {!quickOnly && (
        <div className={view === "ventas" ? "grid gap-4 md:grid-cols-2" : "space-y-4"}>
          {sales.map((sale) => (
            <SaleCard key={sale.id} sale={sale} />
          ))}
        </div>
      )}
    </section>
  );
}

export default FerreteriaSales;
