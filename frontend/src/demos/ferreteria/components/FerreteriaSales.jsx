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

const getInputDate = (daysOffset = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
};

const getSaleTime = (date = new Date()) =>
  date.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });

const getSaleTimestamp = (sale) => {
  if (sale.createdAt) return new Date(sale.createdAt).getTime();
  if (sale.dateISO && sale.time) return new Date(`${sale.dateISO}T${sale.time}:00`).getTime();
  if (sale.dateISO) return new Date(`${sale.dateISO}T00:00:00`).getTime();
  return 0;
};

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

function DonutChart({ data }) {
  const palette = ["#00D38E", "#07111F", "#F59E0B", "#38BDF8", "#A855F7"];
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let accumulated = 0;
  const gradient = total
    ? data
        .map((item, index) => {
          const start = (accumulated / total) * 100;
          accumulated += item.value;
          const end = (accumulated / total) * 100;
          return `${palette[index % palette.length]} ${start}% ${end}%`;
        })
        .join(", ")
    : "#E2E8F0 0% 100%";

  return (
    <div className="grid gap-5 sm:grid-cols-[160px_1fr] sm:items-center">
      <div
        className="mx-auto grid h-40 w-40 place-items-center rounded-full"
        style={{ background: `conic-gradient(${gradient})` }}
      >
        <div className="grid h-24 w-24 place-items-center rounded-full bg-white text-center">
          <span className="text-xl font-black text-slate-950">{data.length}</span>
          <span className="-mt-4 text-xs font-bold text-slate-500">grupos</span>
        </div>
      </div>

      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={item.label} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex min-w-0 items-center gap-2 font-bold text-slate-600">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: palette[index % palette.length] }}
              />
              <span className="truncate">{item.label}</span>
            </span>
            <span className="shrink-0 font-black text-slate-950">
              {currency.format(item.value)}
            </span>
          </div>
        ))}

        {!data.length && (
          <p className="text-sm font-bold text-slate-400">Sin datos para mostrar.</p>
        )}
      </div>
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
        {sale.time && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            {sale.time} hs
          </span>
        )}
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
    customer: clients[0]?.name ?? "",
    productId: products[0]?.id ?? "",
    quantity: 1,
    method: "Efectivo",
    status: "Pagado",
  });
  const [selectedDate, setSelectedDate] = useState(getInputDate());
  const [selectedCustomer, setSelectedCustomer] = useState("Todos");
  const [reportCustomer, setReportCustomer] = useState("Todos");
  const [reportMonth, setReportMonth] = useState(getInputDate().slice(0, 7));
  const [reportFromDate, setReportFromDate] = useState(`${getInputDate().slice(0, 7)}-01`);
  const [reportToDate, setReportToDate] = useState(getInputDate());

  const selectedProduct = products.find(
    (product) => product.id === Number(saleForm.productId)
  );

  const pendingSales = sales.filter((sale) => sale.status !== "Pagado");
  const today = getInputDate();
  const currentMonth = today.slice(0, 7);
  const isTodaySale = (sale) =>
    sale.dateISO === today || sale.date === "Hoy" || sale.date === "Ahora";
  const isCurrentMonthSale = (sale) =>
    sale.dateISO?.startsWith(currentMonth) || sale.date === "Hoy" || sale.date === "Ahora";
  const isCounterSale = (sale) => sale.customer === "Venta mostrador";
  const totalThisMonth = sales
    .filter(isCurrentMonthSale)
    .reduce((sum, sale) => sum + sale.total, 0);
  const totalToday = sales
    .filter(isTodaySale)
    .reduce((sum, sale) => sum + sale.total, 0);
  const profitToday = sales
    .filter(isTodaySale)
    .reduce((sum, sale) => sum + (sale.total - (sale.cost ?? sale.total * 0.68)), 0);
  const counterThisMonth = sales
    .filter((sale) => isCurrentMonthSale(sale) && isCounterSale(sale))
    .reduce((sum, sale) => sum + sale.total, 0);
  const counterToday = sales
    .filter((sale) => isTodaySale(sale) && isCounterSale(sale))
    .reduce((sum, sale) => sum + sale.total, 0);

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
    if (!selectedProduct || !saleForm.customer) return;

    const quantity = Math.max(1, Number(saleForm.quantity));
    const total = selectedProduct.price * quantity;
    const estimatedCost = Math.round(
      (selectedProduct.costPrice ?? selectedProduct.price * 0.68) * quantity
    );
    const now = new Date();

    setSales((current) => [
      {
        id: `V-${2050 + current.length}`,
        customer: saleForm.customer,
        total,
        cost: estimatedCost,
        method: saleForm.method,
        status: saleForm.status,
        date: "Ahora",
        dateISO: getInputDate(),
        time: getSaleTime(now),
        createdAt: now.toISOString(),
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

  const canFilterByDate = view === "resumen" || view === "ventas";
  const salesByDate = canFilterByDate
    ? sales.filter((sale) => sale.dateISO === selectedDate)
    : sales;
  const salesForView = view === "ventas"
    ? salesByDate.filter((sale) => !isCounterSale(sale))
    : salesByDate;
  const availableCustomers = [
    "Todos",
    ...new Set(salesForView.map((sale) => sale.customer)),
  ];
  const visibleSales = [...salesForView.filter((sale) =>
    selectedCustomer === "Todos" || sale.customer === selectedCustomer
  )].sort((firstSale, secondSale) => (
    getSaleTimestamp(secondSale) - getSaleTimestamp(firstSale)
  ));
  const visibleSalesTotal = visibleSales.reduce((sum, sale) => sum + sale.total, 0);
  const selectedDateTotal = salesByDate.reduce((sum, sale) => sum + sale.total, 0);

  const markPaid = (saleId) => {
    setSales((current) =>
      current.map((sale) =>
        sale.id === saleId ? { ...sale, status: "Pagado", method: "Cobrado" } : sale
      )
    );
  };

  if (view === "reportes") {
    const reportClients = [
      "Todos",
      ...new Set(sales.map((sale) => sale.customer)),
    ];
    const monthSales = sales.filter((sale) => sale.dateISO?.startsWith(reportMonth));
    const filteredReportSales = sales
      .filter((sale) => {
        const matchesCustomer =
          reportCustomer === "Todos" || sale.customer === reportCustomer;
        const matchesMonth = !reportMonth || sale.dateISO?.startsWith(reportMonth);
        const matchesFrom = !reportFromDate || sale.dateISO >= reportFromDate;
        const matchesTo = !reportToDate || sale.dateISO <= reportToDate;

        return matchesCustomer && matchesMonth && matchesFrom && matchesTo;
      })
      .sort((firstSale, secondSale) => getSaleTimestamp(secondSale) - getSaleTimestamp(firstSale));
    const totalSales = filteredReportSales.reduce((sum, sale) => sum + sale.total, 0);
    const totalCost = filteredReportSales.reduce(
      (sum, sale) => sum + (sale.cost ?? sale.total * 0.68),
      0
    );
    const totalProfit = Math.max(0, totalSales - totalCost);
    const pendingReportSales = filteredReportSales.filter((sale) => sale.status !== "Pagado");
    const pendingByDate = pendingReportSales.reduce((acc, sale) => {
      const label = sale.dateISO || "Sin fecha";
      acc[label] = (acc[label] ?? 0) + sale.total;
      return acc;
    }, {});
    const customerGroups = filteredReportSales.reduce((acc, sale) => {
      if (!acc[sale.customer]) {
        acc[sale.customer] = { label: sale.customer, value: 0, count: 0 };
      }
      acc[sale.customer].value += sale.total;
      acc[sale.customer].count += 1;
      return acc;
    }, {});
    const methodGroups = filteredReportSales.reduce((acc, sale) => {
      const label = sale.method || "Sin metodo";
      acc[label] = { label, value: (acc[label]?.value ?? 0) + sale.total };
      return acc;
    }, {});
    const monthData = reports.map((report) => ({
      label: report.month.slice(0, 3),
      sales:
        report.month === "Junio"
          ? monthSales.reduce((sum, sale) => sum + sale.total, 0)
          : report.sales,
      cost:
        report.month === "Junio"
          ? monthSales.reduce((sum, sale) => sum + (sale.cost ?? sale.total * 0.68), 0)
          : Math.round(report.sales - report.profit),
      profit:
        report.month === "Junio"
          ? Math.max(
              0,
              monthSales.reduce((sum, sale) => sum + sale.total, 0) -
                monthSales.reduce((sum, sale) => sum + (sale.cost ?? sale.total * 0.68), 0)
            )
          : report.profit,
    }));
    const customerData = Object.values(customerGroups)
      .sort((first, second) => second.value - first.value)
      .slice(0, 5);
    const methodData = Object.values(methodGroups)
      .sort((first, second) => second.value - first.value)
      .slice(0, 5);
    const filteredDailyReports = dayLabels.map((day) => {
      const daySales = filteredReportSales.filter((sale) => sale.day === day);
      const salesTotal = daySales.reduce((sum, sale) => sum + sale.total, 0);
      const costTotal = daySales.reduce(
        (sum, sale) => sum + (sale.cost ?? sale.total * 0.68),
        0
      );

      return {
        label: day,
        sales: salesTotal,
        cost: costTotal,
        profit: Math.max(0, salesTotal - costTotal),
      };
    });

    return (
      <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-black text-slate-950">
            Reportes de ventas
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Filtra por cliente, mes o rango de fechas para revisar ventas, cobros y movimientos con hora.
          </p>
        </div>

        <div className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="grid gap-1">
            <span className="px-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
              Cliente
            </span>
            <select
              value={reportCustomer}
              onChange={(event) => setReportCustomer(event.target.value)}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
            >
              {reportClients.map((client) => (
                <option key={client} value={client}>
                  {client}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1">
            <span className="px-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
              Mes
            </span>
            <input
              type="month"
              value={reportMonth}
              onChange={(event) => setReportMonth(event.target.value)}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
            />
          </label>

          <label className="grid gap-1">
            <span className="px-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
              Desde
            </span>
            <input
              type="date"
              value={reportFromDate}
              onChange={(event) => setReportFromDate(event.target.value)}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
            />
          </label>

          <label className="grid gap-1">
            <span className="px-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
              Hasta
            </span>
            <input
              type="date"
              value={reportToDate}
              onChange={(event) => setReportToDate(event.target.value)}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
            />
          </label>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm font-bold text-slate-500">Ventas filtradas</p>
            <p className="mt-2 text-2xl font-black text-slate-950">
              {currency.format(totalSales)}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm font-bold text-slate-500">Costo de productos</p>
            <p className="mt-2 text-2xl font-black text-red-700">
              {currency.format(totalCost)}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm font-bold text-slate-500">Ganancia neta</p>
            <p className="mt-2 text-2xl font-black text-emerald-700">
              {currency.format(totalProfit)}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm font-bold text-slate-500">Pendiente de cobro</p>
            <p className="mt-2 text-2xl font-black text-amber-700">
              {currency.format(pendingReportSales.reduce((sum, sale) => sum + sale.total, 0))}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm font-bold text-slate-500">Operaciones</p>
            <p className="mt-2 text-2xl font-black text-slate-950">
              {filteredReportSales.length}
            </p>
          </article>
        </div>

        <div className="mb-6 grid gap-4 xl:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="mb-4 font-black text-slate-950">Ventas por dia</p>
            <BarChart data={filteredDailyReports} valueKey="sales" />
          </article>

          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="mb-4 font-black text-slate-950">Costos por dia</p>
            <BarChart data={filteredDailyReports} valueKey="cost" color="bg-red-500" />
          </article>

          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="mb-4 font-black text-slate-950">Ganancia neta por dia</p>
            <BarChart data={filteredDailyReports} valueKey="profit" color="bg-slate-950" />
          </article>

          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="mb-4 font-black text-slate-950">Ventas por mes</p>
            <BarChart data={monthData} valueKey="sales" />
          </article>

          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="mb-4 font-black text-slate-950">Costos por mes</p>
            <BarChart data={monthData} valueKey="cost" color="bg-red-500" />
          </article>

          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="mb-4 font-black text-slate-950">Ganancia neta por mes</p>
            <BarChart data={monthData} valueKey="profit" color="bg-slate-950" />
          </article>

          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="mb-4 font-black text-slate-950">Medios de pago</p>
            <DonutChart data={methodData} />
          </article>
        </div>

        <div className="mb-6 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="mb-4 font-black text-slate-950">Clientes con mas ventas</p>
            <DonutChart data={customerData} />
          </article>

          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="mb-4 font-black text-slate-950">Resumen por cliente</p>
            <div className="space-y-3">
              {customerData.map((client) => (
                <div key={client.label} className="rounded-xl bg-slate-50 p-3">
                  <div className="flex justify-between gap-3">
                    <p className="font-black text-slate-950">{client.label}</p>
                    <p className="font-black text-slate-950">{currency.format(client.value)}</p>
                  </div>
                  <p className="mt-1 text-sm font-bold text-slate-500">
                    {client.count} ventas asociadas
                  </p>
                </div>
              ))}

              {!customerData.length && (
                <p className="rounded-xl bg-slate-50 p-4 text-sm font-bold text-slate-400">
                  No hay ventas para el filtro seleccionado.
                </p>
              )}
            </div>
          </article>
        </div>

        <div className="mb-6 grid gap-4 xl:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="mb-4 font-black text-slate-950">Por cobrar por fecha</p>
            <div className="space-y-3">
              {Object.entries(pendingByDate).map(([date, total]) => (
                <div key={date} className="flex justify-between gap-3 rounded-xl bg-amber-50 p-3 text-sm">
                  <span className="font-bold text-amber-800">{date}</span>
                  <span className="font-black text-amber-800">{currency.format(total)}</span>
                </div>
              ))}

              {!Object.keys(pendingByDate).length && (
                <p className="rounded-xl bg-slate-50 p-4 text-sm font-bold text-slate-400">
                  No hay cobranzas pendientes en este filtro.
                </p>
              )}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="mb-4 font-black text-slate-950">Ventas del filtro</p>
            <div className="max-h-96 space-y-3 overflow-y-auto pr-1">
              {filteredReportSales.map((sale) => (
                <div key={sale.id} className="rounded-xl bg-slate-50 p-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-black text-slate-400">{sale.id}</p>
                      <p className="break-words font-black text-slate-950">{sale.customer}</p>
                      <p className="mt-1 text-sm text-slate-500">{sale.items}</p>
                    </div>
                    <p className="shrink-0 font-black text-slate-950">
                      {currency.format(sale.total)}
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">
                      {sale.dateISO || sale.date}
                    </span>
                    {sale.time && (
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">
                        {sale.time} hs
                      </span>
                    )}
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">
                      {sale.method}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClasses[sale.status]}`}>
                      {sale.status}
                    </span>
                  </div>
                </div>
              ))}

              {!filteredReportSales.length && (
                <p className="rounded-xl bg-slate-50 p-4 text-sm font-bold text-slate-400">
                  No hay ventas para el filtro seleccionado.
                </p>
              )}
            </div>
          </article>
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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h3 className="text-2xl font-black text-slate-950">
              {quickOnly ? "Venta rapida" : view === "ventas" ? "Registrar ventas" : "Ventas recientes"}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {quickOnly
                ? "Carga una venta de mostrador y descuenta stock al instante."
                : view === "resumen"
                  ? "Por defecto ves las ventas de hoy. Elegi otra fecha para revisar movimientos anteriores."
                  : "Vende directo de mostrador o asigna la venta a un cliente si hace falta."}
            </p>
          </div>

          {canFilterByDate && (
            <div className="grid gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:min-w-72">
              <label className="grid gap-1">
                <span className="px-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                  Ver ventas del dia
                </span>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(event) => {
                    setSelectedDate(event.target.value);
                    setSelectedCustomer("Todos");
                  }}
                  className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
                />
              </label>
              <label className="grid gap-1">
                <span className="px-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                  Mostrador o cliente
                </span>
                <select
                  value={selectedCustomer}
                  onChange={(event) => setSelectedCustomer(event.target.value)}
                  className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
                >
                  {availableCustomers.map((customer) => (
                    <option key={customer} value={customer}>
                      {customer}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid gap-1 px-1 text-sm">
                <p className="font-black text-slate-950">
                  Total filtrado: {currency.format(visibleSalesTotal)}
                </p>
                <p className="font-bold text-slate-500">
                  Total del dia: {currency.format(selectedDateTotal)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {view === "ventas" && (
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {[
            { label: "Ventas totales del mes", value: totalThisMonth },
            { label: "Ventas totales de hoy", value: totalToday },
            { label: "Ganancia de hoy", value: profitToday, tone: "text-emerald-700" },
            { label: "Venta mostrador del mes", value: counterThisMonth },
            { label: "Venta mostrador de hoy", value: counterToday },
          ].map((card) => (
            <article key={card.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-bold text-slate-500">{card.label}</p>
              <p className={`mt-2 break-words text-2xl font-black ${card.tone ?? "text-slate-950"}`}>
                {currency.format(card.value)}
              </p>
            </article>
          ))}
        </div>
      )}

      {(view === "ventas" || quickOnly) && (
        <form
          onSubmit={registerSale}
          className="mb-6 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-2 xl:grid-cols-4"
        >
          <select
            value={saleForm.customer}
            onChange={(event) => updateSaleForm("customer", event.target.value)}
            className="min-w-0 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
          >
            {quickOnly && <option value="Venta mostrador">Venta mostrador</option>}
            {clients.map((client) => (
              <option key={client.id} value={client.name}>
                {client.name}
              </option>
            ))}
          </select>

          <select
            value={saleForm.productId}
            onChange={(event) => updateSaleForm("productId", event.target.value)}
            className="min-w-0 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} · Stock {product.stock}
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
              value={saleForm.quantity}
              onChange={(event) => updateSaleForm("quantity", event.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
            />
          </label>

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
            className="min-w-0 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
          >
            <option>Efectivo</option>
            <option>Mercado Pago</option>
            <option>Transferencia</option>
            <option>Tarjeta</option>
            <option>Cuenta corriente</option>
          </select>

          <div className="rounded-xl bg-white px-3 py-3 text-sm font-black text-slate-950">
            Total: {currency.format((selectedProduct?.price ?? 0) * Number(saleForm.quantity || 0))}
          </div>

          <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] md:col-span-2 xl:col-span-1">
            Registrar venta
          </button>
        </form>
      )}

      {!quickOnly && (
        <div className={view === "ventas" ? "grid gap-4 md:grid-cols-2" : "space-y-4"}>
          {visibleSales.map((sale) => (
            <SaleCard key={sale.id} sale={sale} />
          ))}

          {!visibleSales.length && (
            <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm font-bold text-slate-500">
              {view === "ventas"
                ? "Todavia no hay ventas cargadas a clientes."
                : "No hay ventas cargadas para la fecha seleccionada."}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default FerreteriaSales;
