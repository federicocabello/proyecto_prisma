const stats = [
  {
    label: "Pacientes activos",
    value: "248",
    detail: "Registro centralizado",
  },
  {
    label: "Citas de hoy",
    value: "16",
    detail: "Agenda médica activa",
  },
  {
    label: "Pagos del mes",
    value: "$32.600",
    detail: "Consultas y servicios",
  },
  {
    label: "Documentos pendientes",
    value: "11",
    detail: "Requieren revisión",
  },
];

function ClinicaStats() {
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

export default ClinicaStats;