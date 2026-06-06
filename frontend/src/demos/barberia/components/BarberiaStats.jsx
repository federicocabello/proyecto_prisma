const stats = [
  {
    label: "Ingresos de hoy",
    value: "$420",
    detail: "8 servicios completados",
  },
  {
    label: "Turnos de hoy",
    value: "14",
    detail: "6 pendientes",
  },
  {
    label: "Próximos turnos",
    value: "9",
    detail: "Entre hoy y mañana",
  },
  {
    label: "Clientes del mes",
    value: "86",
    detail: "18 nuevos clientes",
  },
];

function BarberiaStats() {
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

export default BarberiaStats;