const orders = [
  {
    id: "OT-1024",
    client: "María González",
    service: "Reparación de lavarropas",
    technician: "Diego",
    date: "Hoy",
    time: "10:30",
    amount: "$85.000",
    status: "En proceso",
  },
  {
    id: "OT-1025",
    client: "Local Avenida",
    service: "Instalación de cámaras",
    technician: "Lucas",
    date: "Hoy",
    time: "13:00",
    amount: "$240.000",
    status: "Pendiente",
  },
  {
    id: "OT-1026",
    client: "Carlos Méndez",
    service: "Mantenimiento de aire",
    technician: "Jesús",
    date: "Mañana",
    time: "09:00",
    amount: "$65.000",
    status: "Agendada",
  },
  {
    id: "OT-1027",
    client: "Oficina Centro",
    service: "Revisión eléctrica",
    technician: "Diego",
    date: "Ayer",
    time: "16:00",
    amount: "$48.000",
    status: "Completada",
  },
];

function OrdenesTrabajo() {
  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-black text-slate-950">
            Órdenes de trabajo
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Control de trabajos pendientes, técnicos asignados, estados y pagos.
          </p>
        </div>

        <button className="w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] md:w-auto">
          Nueva orden
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-4 font-bold">Orden</th>
                <th className="px-5 py-4 font-bold">Cliente</th>
                <th className="px-5 py-4 font-bold">Servicio</th>
                <th className="px-5 py-4 font-bold">Técnico</th>
                <th className="px-5 py-4 font-bold">Fecha</th>
                <th className="px-5 py-4 font-bold">Monto</th>
                <th className="px-5 py-4 font-bold">Estado</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-black text-slate-950">
                    {order.id}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {order.client}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {order.service}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {order.technician}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {order.date} · {order.time}
                  </td>

                  <td className="px-5 py-4 font-bold text-slate-950">
                    {order.amount}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        order.status === "Completada"
                          ? "bg-[#00D38E]/10 text-emerald-700"
                          : order.status === "En proceso"
                          ? "bg-sky-100 text-sky-700"
                          : order.status === "Pendiente"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default OrdenesTrabajo;
