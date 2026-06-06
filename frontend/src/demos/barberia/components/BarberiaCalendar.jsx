const days = [
  {
    day: "Lun",
    date: "10",
    appointments: 5,
    income: "$210",
    active: false,
  },
  {
    day: "Mar",
    date: "11",
    appointments: 8,
    income: "$320",
    active: false,
  },
  {
    day: "Mié",
    date: "12",
    appointments: 14,
    income: "$420",
    active: true,
  },
  {
    day: "Jue",
    date: "13",
    appointments: 9,
    income: "$260",
    active: false,
  },
  {
    day: "Vie",
    date: "14",
    appointments: 12,
    income: "$380",
    active: false,
  },
  {
    day: "Sáb",
    date: "15",
    appointments: 16,
    income: "$520",
    active: false,
  },
  {
    day: "Dom",
    date: "16",
    appointments: 0,
    income: "$0",
    active: false,
  },
];

const timeline = [
  {
    time: "09:00",
    client: "Juan Martínez",
    service: "Corte clásico",
    barber: "Leo",
    status: "Completado",
  },
  {
    time: "10:00",
    client: "Pedro Gómez",
    service: "Corte + barba",
    barber: "Mauro",
    status: "Completado",
  },
  {
    time: "11:30",
    client: "Carlos Díaz",
    service: "Fade",
    barber: "Leo",
    status: "Próximo",
  },
  {
    time: "13:00",
    client: "Lucas Pérez",
    service: "Barba",
    barber: "Mauro",
    status: "Pendiente",
  },
];

function BarberiaCalendar() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-black text-slate-950">
            Calendario de turnos
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Visualización semanal de turnos, ingresos y disponibilidad.
          </p>
        </div>

        <button className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F]">
          Agendar turno
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7">
        {days.map((day) => (
          <div
            key={day.date}
            className={`rounded-2xl border p-4 ${
              day.active
                ? "border-[#00D38E] bg-[#00D38E]/10"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="font-bold text-slate-900">{day.day}</p>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  day.active
                    ? "bg-[#00D38E] text-[#07111F]"
                    : "bg-white text-slate-500"
                }`}
              >
                {day.date}
              </span>
            </div>

            <p className="mt-4 text-2xl font-black text-slate-950">
              {day.appointments}
            </p>
            <p className="text-xs text-slate-500">turnos</p>

            <p className="mt-3 text-sm font-bold text-[#00D38E]">
              {day.income}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h4 className="mb-4 text-lg font-black text-slate-950">
          Agenda del día
        </h4>

        <div className="space-y-3">
          {timeline.map((item) => (
            <div
              key={`${item.time}-${item.client}`}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">
                  {item.time}
                </div>

                <div>
                  <p className="font-black text-slate-950">
                    {item.client}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.service} · Barbero: {item.barber}
                  </p>
                </div>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                  item.status === "Completado"
                    ? "bg-[#00D38E]/10 text-emerald-700"
                    : item.status === "Próximo"
                    ? "bg-sky-100 text-sky-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BarberiaCalendar;