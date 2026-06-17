const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

function FerreteriaStats({ products, sales, clients }) {
  const salesTotal = sales.reduce((sum, sale) => sum + sale.total, 0);
  const lowStock = products.filter((product) => product.stock <= product.minStock).length;
  const pendingTotal = sales
    .filter((sale) => sale.status !== "Pagado")
    .reduce((sum, sale) => sum + sale.total, 0);

  const stats = [
    {
      label: "Productos registrados",
      value: products.length,
      detail: `${clients.length} clientes cargados`,
    },
    {
      label: "Ventas cargadas",
      value: currency.format(salesTotal),
      detail: `${sales.length} operaciones`,
    },
    {
      label: "Stock bajo",
      value: lowStock,
      detail: "Requieren reposicion",
    },
    {
      label: "Cobranzas",
      value: currency.format(pendingTotal),
      detail: "Pendiente de cobro",
    },
  ];

  return (
    <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-semibold text-slate-500">{stat.label}</p>

          <p className="mt-3 break-words text-3xl font-black text-slate-950">
            {stat.value}
          </p>

          <p className="mt-2 text-sm text-[#00D38E]">{stat.detail}</p>
        </article>
      ))}
    </section>
  );
}

export default FerreteriaStats;
