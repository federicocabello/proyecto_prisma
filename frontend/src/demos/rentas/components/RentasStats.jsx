const stats = [
  {
    label: "Unidades ocupadas",
    value: "18/22",
    detail: "82% de ocupación",
  },
  {
    label: "Cobros del mes",
    value: "$12.600",
    detail: "Rentas mensuales",
  },
  {
    label: "Pagos vencidos",
    value: "4",
    detail: "Requieren seguimiento",
  },
  {
    label: "Mantenimiento",
    value: "7",
    detail: "Solicitudes abiertas",
  },
];

function RentasStats() {
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

export default RentasStats;