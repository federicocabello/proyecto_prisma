const requests = [
  {
    unit: "Apt. 104",
    issue: "Aire acondicionado no enfría",
    priority: "Alta",
    status: "Pendiente",
  },
  {
    unit: "Apt. 202",
    issue: "Revisión de llave de agua",
    priority: "Media",
    status: "En proceso",
  },
  {
    unit: "Apt. 301",
    issue: "Cambio de cerradura",
    priority: "Baja",
    status: "Completado",
  },
];

function MantenimientoList() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">
          Mantenimiento
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Solicitudes abiertas por unidad.
        </p>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={`${request.unit}-${request.issue}`}
            className="rounded-2xl border border-slate-200 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-black text-slate-950">
                  {request.unit}
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {request.issue}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  request.status === "Completado"
                    ? "bg-[#00D38E]/10 text-emerald-700"
                    : request.status === "En proceso"
                    ? "bg-sky-100 text-sky-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {request.status}
              </span>
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-600">
              Prioridad: {request.priority}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MantenimientoList;