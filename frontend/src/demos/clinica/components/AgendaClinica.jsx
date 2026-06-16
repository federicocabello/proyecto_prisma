const agenda = [
  {
    time: "09:30",
    patient: "Ana Rodríguez",
    reason: "Consulta general",
  },
  {
    time: "10:30",
    patient: "Luis Fernández",
    reason: "Control",
  },
  {
    time: "12:00",
    patient: "María Torres",
    reason: "Revisión de estudios",
  },
  {
    time: "14:00",
    patient: "Lucía Pérez",
    reason: "Primera consulta",
  },
];

function AgendaClinica() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">
          Agenda de hoy
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Horarios y pacientes programados.
        </p>
      </div>

      <div className="space-y-4">
        {agenda.map((item) => (
          <div
            key={`${item.time}-${item.patient}`}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:gap-4"
          >
            <div className="h-fit w-fit rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">
              {item.time}
            </div>

            <div>
              <p className="font-black text-slate-950">
                {item.patient}
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                {item.reason}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AgendaClinica;
