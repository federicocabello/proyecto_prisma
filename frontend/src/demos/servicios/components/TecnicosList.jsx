const technicians = [
  {
    name: "Diego",
    role: "Reparaciones",
    status: "En ruta",
    jobs: 3,
  },
  {
    name: "Lucas",
    role: "Instalaciones",
    status: "Disponible",
    jobs: 2,
  },
  {
    name: "Jesús",
    role: "Mantenimiento",
    status: "Ocupado",
    jobs: 4,
  },
];

function TecnicosList() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">
          Técnicos
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Estado actual del equipo de trabajo.
        </p>
      </div>

      <div className="space-y-4">
        {technicians.map((tech) => (
          <div
            key={tech.name}
            className="rounded-2xl border border-slate-200 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-black text-slate-950">
                  {tech.name}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {tech.role}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  tech.status === "Disponible"
                    ? "bg-[#00D38E]/10 text-emerald-700"
                    : tech.status === "En ruta"
                    ? "bg-sky-100 text-sky-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {tech.status}
              </span>
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-600">
              {tech.jobs} trabajos asignados
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TecnicosList;