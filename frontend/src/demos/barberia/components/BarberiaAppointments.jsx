const appointments = [
  {
    client: "Juan Martínez",
    date: "Hoy",
    time: "09:00",
    service: "Corte clásico",
    barber: "Leo",
    status: "Completado",
  },
  {
    client: "Pedro Gómez",
    date: "Hoy",
    time: "10:00",
    service: "Corte + barba",
    barber: "Mauro",
    status: "Completado",
  },
  {
    client: "Carlos Díaz",
    date: "Hoy",
    time: "11:30",
    service: "Fade",
    barber: "Leo",
    status: "Próximo",
  },
  {
    client: "Lucas Pérez",
    date: "Hoy",
    time: "13:00",
    service: "Barba",
    barber: "Mauro",
    status: "Pendiente",
  },
  {
    client: "Miguel Torres",
    date: "Mañana",
    time: "09:30",
    service: "Corte clásico",
    barber: "Leo",
    status: "Agendado",
  },
  {
    client: "Andrés Ríos",
    date: "Viernes",
    time: "15:00",
    service: "Corte + barba",
    barber: "Mauro",
    status: "Agendado",
  },
];

function BarberiaAppointments() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-black text-slate-950">
            Turnos registrados
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Próximos turnos, turnos completados y citas futuras.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[#00D38E]/10 px-3 py-1 text-xs font-bold text-emerald-700">
            Completados
          </span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
            Pendientes
          </span>
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-700">
            Próximos
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-4 font-bold">Cliente</th>
                <th className="px-5 py-4 font-bold">Día</th>
                <th className="px-5 py-4 font-bold">Hora</th>
                <th className="px-5 py-4 font-bold">Servicio</th>
                <th className="px-5 py-4 font-bold">Barbero</th>
                <th className="px-5 py-4 font-bold">Estado</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {appointments.map((appointment) => (
                <tr key={`${appointment.client}-${appointment.time}`} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-black text-slate-950">
                    {appointment.client}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {appointment.date}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {appointment.time}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {appointment.service}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {appointment.barber}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        appointment.status === "Completado"
                          ? "bg-[#00D38E]/10 text-emerald-700"
                          : appointment.status === "Próximo"
                          ? "bg-sky-100 text-sky-700"
                          : appointment.status === "Pendiente"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {appointment.status}
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

export default BarberiaAppointments;