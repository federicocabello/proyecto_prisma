const patients = [
  {
    name: "Ana Rodríguez",
    phone: "260 412 3366",
    lastVisit: "Hoy",
    pending: "Sin pendientes",
    status: "Activo",
  },
  {
    name: "Luis Fernández",
    phone: "260 555 9811",
    lastVisit: "Hoy",
    pending: "Estudios pendientes",
    status: "Seguimiento",
  },
  {
    name: "María Torres",
    phone: "260 442 1877",
    lastVisit: "Ayer",
    pending: "Debe documentación",
    status: "Pendiente",
  },
  {
    name: "Carlos Méndez",
    phone: "260 788 1100",
    lastVisit: "12/06",
    pending: "Control programado",
    status: "Activo",
  },
];

function PacientesList() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-black text-slate-950">
            Pacientes recientes
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Información rápida de pacientes, pendientes y seguimiento.
          </p>
        </div>

        <button className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F]">
          Nuevo paciente
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {patients.map((patient) => (
          <article
            key={patient.name}
            className="rounded-2xl border border-slate-200 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-black text-slate-950">
                  {patient.name}
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  {patient.phone}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  patient.status === "Activo"
                    ? "bg-[#00D38E]/10 text-emerald-700"
                    : patient.status === "Seguimiento"
                    ? "bg-sky-100 text-sky-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {patient.status}
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs font-bold text-slate-500">
                  Última visita
                </p>
                <p className="mt-1 font-black text-slate-950">
                  {patient.lastVisit}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs font-bold text-slate-500">
                  Pendiente
                </p>
                <p className="mt-1 font-black text-slate-950">
                  {patient.pending}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PacientesList;