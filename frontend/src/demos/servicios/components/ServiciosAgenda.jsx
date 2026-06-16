const visits = [
  {
    time: "10:30",
    client: "María González",
    job: "Reparación de lavarropas",
  },
  {
    time: "13:00",
    client: "Local Avenida",
    job: "Instalación de cámaras",
  },
  {
    time: "16:30",
    client: "Barrio Norte",
    job: "Revisión de red",
  },
];

function ServiciosAgenda() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">
          Agenda de hoy
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Visitas programadas y trabajos del día.
        </p>
      </div>

      <div className="space-y-4">
        {visits.map((visit) => (
          <div
            key={`${visit.time}-${visit.client}`}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:gap-4"
          >
            <div className="h-fit w-fit rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">
              {visit.time}
            </div>

            <div>
              <p className="font-black text-slate-950">
                {visit.client}
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                {visit.job}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServiciosAgenda;
