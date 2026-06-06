const stats = [
  {
    label: "Productos registrados",
    value: "342",
    detail: "12 categorías activas",
  },
  {
    label: "Ventas del mes",
    value: "$18.450",
    detail: "Control por día",
  },
  {
    label: "Stock bajo",
    value: "9",
    detail: "Requieren reposición",
  },
  {
    label: "Proveedores",
    value: "18",
    detail: "Contactos activos",
  },
];

function FerreteriaStats() {
  return (
    <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-semibold text-slate-500">
            {stat.label}
          </p>

          <p className="mt-3 text-3xl font-black text-slate-950">
            {stat.value}
          </p>

          <p className="mt-2 text-sm text-[#00D38E]">
            {stat.detail}
          </p>
        </article>
      ))}
    </section>
  );
}

export default FerreteriaStats;