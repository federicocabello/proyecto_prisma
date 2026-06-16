const appointments = [
  {
    patient: "Ana Rodríguez",
    doctor: "Dra. Carmen",
    reason: "Consulta general",
    date: "Hoy",
    time: "09:30",
    status: "Confirmada",
  },
  {
    patient: "Luis Fernández",
    doctor: "Dr. López",
    reason: "Control",
    date: "Hoy",
    time: "10:30",
    status: "En espera",
  },
  {
    patient: "María Torres",
    doctor: "Dra. Carmen",
    reason: "Revisión de estudios",
    date: "Hoy",
    time: "12:00",
    status: "Pendiente",
  },
  {
    patient: "Carlos Méndez",
    doctor: "Dr. López",
    reason: "Seguimiento",
    date: "Mañana",
    time: "08:45",
    status: "Agendada",
  },
  {
    patient: "Lucía Pérez",
    doctor: "Dra. Carmen",
    reason: "Primera consulta",
    date: "Viernes",
    time: "14:00",
    status: "Agendada",
  },
];

function CitasClinica() {
  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-black text-slate-950">
            Citas médicas
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Consultas de hoy, próximas citas y estado de atención.
          </p>
        </div>

        <button className="w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] md:w-auto">
          Nueva cita
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-4 font-bold">Paciente</th>
                <th className="px-5 py-4 font-bold">Doctor</th>
                <th className="px-5 py-4 font-bold">Motivo</th>
                <th className="px-5 py-4 font-bold">Día</th>
                <th className="px-5 py-4 font-bold">Hora</th>
                <th className="px-5 py-4 font-bold">Estado</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {appointments.map((appointment) => (
                <tr
                  key={`${appointment.patient}-${appointment.time}`}
                  className="hover:bg-slate-50"
                >
                  <td className="px-5 py-4 font-black text-slate-950">
                    {appointment.patient}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {appointment.doctor}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {appointment.reason}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {appointment.date}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {appointment.time}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        appointment.status === "Confirmada"
                          ? "bg-[#00D38E]/10 text-emerald-700"
                          : appointment.status === "En espera"
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

export default CitasClinica;
