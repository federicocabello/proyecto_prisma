import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const menuItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "agenda", label: "Agenda" },
  { id: "turnos", label: "Turnos" },
  { id: "servicios", label: "Servicios" },
  { id: "clientes", label: "Clientes" },
  { id: "barberos", label: "Barberos" },
  { id: "ingresos", label: "Ingresos" },
];

const initialServices = [
  { id: 1, name: "Corte clasico", duration: "30 min", price: 8500 },
  { id: 2, name: "Corte + barba", duration: "45 min", price: 12500 },
  { id: 3, name: "Fade", duration: "40 min", price: 10500 },
  { id: 4, name: "Perfilado de barba", duration: "25 min", price: 6500 },
];

const initialBarbers = [
  { id: 1, name: "Leo", specialty: "Fade y cortes modernos", commission: 40 },
  { id: 2, name: "Mauro", specialty: "Barba y corte clasico", commission: 35 },
  { id: 3, name: "Tomi", specialty: "Diseños y perfilados", commission: 30 },
];

const initialClients = [
  { id: 1, name: "Juan Martinez", phone: "2604 110 238", visits: 6 },
  { id: 2, name: "Pedro Gomez", phone: "2604 884 112", visits: 3 },
  { id: 3, name: "Carlos Diaz", phone: "2604 402 903", visits: 8 },
];

const initialAppointments = [
  { id: "B-101", client: "Juan Martinez", date: "Hoy", time: "09:00", service: "Corte clasico", barber: "Leo", total: 8500, status: "Completado", day: "Lun" },
  { id: "B-102", client: "Pedro Gomez", date: "Hoy", time: "10:00", service: "Corte + barba", barber: "Mauro", total: 12500, status: "Completado", day: "Mar" },
  { id: "B-103", client: "Carlos Diaz", date: "Hoy", time: "11:30", service: "Fade", barber: "Leo", total: 10500, status: "Proximo", day: "Mie" },
  { id: "B-104", client: "Lucas Perez", date: "Hoy", time: "13:00", service: "Perfilado de barba", barber: "Mauro", total: 6500, status: "Pendiente", day: "Jue" },
];

function BarberiaDemo() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [services, setServices] = useState(initialServices);
  const [barbers, setBarbers] = useState(initialBarbers);
  const [clients, setClients] = useState(initialClients);
  const [appointments, setAppointments] = useState(initialAppointments);

  return (
    <main className="min-h-screen bg-slate-100">
      <aside className="fixed left-0 top-0 hidden h-screen w-72 overflow-y-auto border-r border-slate-200 bg-[#07111F] p-6 pb-36 text-white lg:block">
        <Link to="/" className="cursor-pointer block">
          <h1 className="text-2xl font-black">Proyecto Prisma</h1>
          <p className="mt-1 text-sm text-slate-400">Demo Barberia</p>
        </Link>

        <nav className="mt-8 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveSection(item.id)}
              className={`cursor-pointer block w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                activeSection === item.id
                  ? "bg-[#00D38E] text-[#07111F]"
                  : "text-slate-300 hover:bg-white/10 hover:text-[#00D38E]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <section className="lg:ml-72">
        <div className="mx-auto max-w-7xl px-5 py-6 md:px-8">
          <MobileTop />
          <BarberiaHeader />

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 lg:hidden">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={`cursor-pointer shrink-0 rounded-full px-4 py-2 text-sm font-bold ${
                  activeSection === item.id ? "bg-slate-950 text-white" : "bg-white text-slate-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <BarberiaStats appointments={appointments} clients={clients} />

          {activeSection === "dashboard" && (
            <>
              <div className="mt-8">
                <QuickAppointment
                  services={services}
                  barbers={barbers}
                  clients={clients}
                  setClients={setClients}
                  appointments={appointments}
                  setAppointments={setAppointments}
                />
              </div>
              <div className="mt-8 grid gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                  <AppointmentsList appointments={appointments} setAppointments={setAppointments} compact />
                </div>
                <ServicesList services={services} compact />
              </div>
            </>
          )}

          {activeSection === "agenda" && (
            <div className="mt-8">
              <Agenda appointments={appointments} setAppointments={setAppointments} />
            </div>
          )}

          {activeSection === "turnos" && (
            <div className="mt-8">
              <AppointmentsList appointments={appointments} setAppointments={setAppointments} />
            </div>
          )}

          {activeSection === "servicios" && (
            <div className="mt-8">
              <ServicesList services={services} setServices={setServices} />
            </div>
          )}

          {activeSection === "clientes" && (
            <div className="mt-8">
              <ClientsList clients={clients} setClients={setClients} />
            </div>
          )}

          {activeSection === "barberos" && (
            <div className="mt-8">
              <BarbersList barbers={barbers} setBarbers={setBarbers} appointments={appointments} />
            </div>
          )}

          {activeSection === "ingresos" && (
            <div className="mt-8">
              <IncomeReports appointments={appointments} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function MobileTop() {
  return (
    <div className="mb-6 flex items-center justify-between gap-3 lg:hidden">
      <div className="min-w-0">
        <h1 className="break-words text-xl font-black text-slate-950">Demo Barberia</h1>
        <p className="text-sm text-slate-500">Proyecto Prisma</p>
      </div>
      <Link to="/" className="cursor-pointer shrink-0 rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white">
        Volver
      </Link>
    </div>
  );
}

function BarberiaHeader() {
  const whatsappMessage = encodeURIComponent(
    "Hola Federico, vi el demo de barberia y quiero un sistema asi para mi negocio."
  );

  return (
    <header className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-bold text-[#00D38E]">Sistema demo</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950 md:text-4xl">
            Barberia Prisma
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Agenda turnos, organiza barberos, registra servicios y controla los ingresos diarios.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/" className="cursor-pointer rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
            Volver a inicio
          </Link>
          <a
            href={`https://wa.me/5492604659499?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer rounded-2xl bg-[#00D38E] px-5 py-3 text-sm font-bold text-[#07111F] shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-300"
          >
            Quiero este sistema
          </a>
        </div>
      </div>
    </header>
  );
}

function BarberiaStats({ appointments, clients }) {
  const completed = appointments.filter((item) => item.status === "Completado");
  const pending = appointments.filter((item) => item.status !== "Completado");
  const income = completed.reduce((sum, item) => sum + item.total, 0);
  const stats = [
    { label: "Ingresos de hoy", value: currency.format(income), detail: `${completed.length} servicios completados` },
    { label: "Turnos activos", value: appointments.length, detail: `${pending.length} pendientes` },
    { label: "Clientes", value: clients.length, detail: "Base temporal cargada" },
    { label: "Ticket promedio", value: currency.format(completed.length ? income / completed.length : 0), detail: "Servicios cobrados" },
  ];

  return (
    <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article key={stat.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
          <p className="mt-3 break-words text-3xl font-black text-slate-950">{stat.value}</p>
          <p className="mt-2 text-sm text-[#00D38E]">{stat.detail}</p>
        </article>
      ))}
    </section>
  );
}

function QuickAppointment({ services, barbers, clients, setClients, appointments, setAppointments }) {
  const [form, setForm] = useState({
    client: clients[0]?.name ?? "",
    phone: "",
    serviceId: services[0]?.id ?? "",
    barber: barbers[0]?.name ?? "",
    date: "Hoy",
    time: "12:00",
  });

  const service = services.find((item) => item.id === Number(form.serviceId));
  const updateForm = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const saveAppointment = (event) => {
    event.preventDefault();
    if (!service || !form.client.trim()) return;

    const knownClient = clients.some((client) => client.name === form.client.trim());
    if (!knownClient) {
      setClients((current) => [
        { id: Date.now(), name: form.client.trim(), phone: form.phone || "Sin telefono", visits: 0 },
        ...current,
      ]);
    }

    setAppointments((current) => [
      {
        id: `B-${120 + current.length}`,
        client: form.client.trim(),
        date: form.date,
        time: form.time,
        service: service.name,
        barber: form.barber,
        total: service.price,
        status: "Pendiente",
        day: "Vie",
      },
      ...current,
    ]);
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Agendar turno rapido</h3>
        <p className="mt-1 text-sm text-slate-500">
          Carga un cliente, servicio, barbero y horario en segundos.
        </p>
      </div>

      <form onSubmit={saveAppointment} className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-6">
        <input value={form.client} onChange={(event) => updateForm("client", event.target.value)} placeholder="Cliente" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2" />
        <input value={form.phone} onChange={(event) => updateForm("phone", event.target.value)} placeholder="Telefono nuevo cliente" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <select value={form.serviceId} onChange={(event) => updateForm("serviceId", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2">
          {services.map((item) => <option key={item.id} value={item.id}>{item.name} · {currency.format(item.price)}</option>)}
        </select>
        <select value={form.barber} onChange={(event) => updateForm("barber", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]">
          {barbers.map((item) => <option key={item.id}>{item.name}</option>)}
        </select>
        <select value={form.date} onChange={(event) => updateForm("date", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]">
          <option>Hoy</option>
          <option>Mañana</option>
          <option>Viernes</option>
          <option>Sabado</option>
        </select>
        <input type="time" value={form.time} onChange={(event) => updateForm("time", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <div className="rounded-xl bg-white px-3 py-3 text-sm font-black text-slate-950 lg:col-span-2">
          Total: {currency.format(service?.price ?? 0)}
        </div>
        <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] lg:col-span-2">
          Guardar turno
        </button>
      </form>
    </section>
  );
}

function AppointmentsList({ appointments, setAppointments, compact = false }) {
  const markCompleted = (appointmentId) => {
    setAppointments((current) =>
      current.map((item) =>
        item.id === appointmentId ? { ...item, status: "Completado" } : item
      )
    );
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">
          {compact ? "Proximos turnos" : "Turnos registrados"}
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Revisa horarios, servicios, barberos y estados.
        </p>
      </div>

      <div className={compact ? "grid gap-4 md:grid-cols-2" : "grid gap-4 md:grid-cols-2 xl:grid-cols-3"}>
        {appointments.map((item) => (
          <article key={item.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-black text-slate-400">{item.id}</p>
                <p className="mt-1 break-words font-black text-slate-950">{item.client}</p>
                <p className="mt-1 text-sm text-slate-500">{item.service} · {item.barber}</p>
              </div>
              <span className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-bold ${statusClass(item.status)}`}>
                {item.status}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Dia</p>
                <p className="font-black text-slate-950">{item.date}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Hora</p>
                <p className="font-black text-slate-950">{item.time}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Precio</p>
                <p className="font-black text-slate-950">{currency.format(item.total)}</p>
              </div>
            </div>
            {item.status !== "Completado" && (
              <button onClick={() => markCompleted(item.id)} type="button" className="cursor-pointer mt-4 w-full rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F]">
                Marcar completado
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function statusClass(status) {
  if (status === "Completado") return "bg-[#00D38E]/10 text-emerald-700";
  if (status === "Proximo") return "bg-sky-100 text-sky-700";
  return "bg-amber-100 text-amber-700";
}

function Agenda({ appointments, setAppointments }) {
  const grouped = ["Hoy", "Mañana", "Viernes", "Sabado"].map((date) => ({
    date,
    items: appointments.filter((item) => item.date === date),
  }));

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <h3 className="mb-6 text-2xl font-black text-slate-950">Agenda</h3>
      <div className="grid gap-4 xl:grid-cols-4">
        {grouped.map((group) => (
          <article key={group.date} className="rounded-2xl border border-slate-200 p-4">
            <p className="mb-4 font-black text-slate-950">{group.date}</p>
            <div className="space-y-3">
              {group.items.map((item) => (
                <div key={item.id} className="rounded-xl bg-slate-50 p-3">
                  <p className="font-black text-slate-950">{item.time}</p>
                  <p className="text-sm text-slate-500">{item.client}</p>
                  <p className="text-xs text-slate-400">{item.service}</p>
                </div>
              ))}
              {!group.items.length && (
                <p className="rounded-xl bg-slate-50 p-3 text-sm font-bold text-slate-400">Sin turnos</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ServicesList({ services, setServices, compact = false }) {
  const [form, setForm] = useState({ name: "", duration: "", price: "" });
  const addService = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !setServices) return;
    setServices((current) => [
      { id: Date.now(), name: form.name.trim(), duration: form.duration || "30 min", price: Number(form.price || 0) },
      ...current,
    ]);
    setForm({ name: "", duration: "", price: "" });
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <h3 className="mb-6 text-2xl font-black text-slate-950">Servicios</h3>
      {!compact && (
        <form onSubmit={addService} className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-4">
          <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Servicio" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] md:col-span-2" />
          <input value={form.duration} onChange={(event) => setForm((current) => ({ ...current, duration: event.target.value }))} placeholder="Duracion" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
          <input type="number" value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))} placeholder="Precio" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
          <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] md:col-span-4 md:w-fit">
            Agregar servicio
          </button>
        </form>
      )}
      <div className={compact ? "space-y-3" : "grid gap-4 md:grid-cols-2 xl:grid-cols-4"}>
        {services.map((service) => (
          <article
            key={service.id}
            className={`rounded-2xl border border-slate-200 p-4 ${
              compact ? "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" : ""
            }`}
          >
            <div className="min-w-0">
              <p className="break-words font-black text-slate-950">{service.name}</p>
              <p className="mt-1 text-sm text-slate-500">Duracion: {service.duration}</p>
            </div>
            <p className="shrink-0 text-xl font-black text-emerald-700 sm:text-right">
              {currency.format(service.price)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ClientsList({ clients, setClients }) {
  const [form, setForm] = useState({ name: "", phone: "" });
  const addClient = (event) => {
    event.preventDefault();
    if (!form.name.trim()) return;
    setClients((current) => [
      { id: Date.now(), name: form.name.trim(), phone: form.phone || "Sin telefono", visits: 0 },
      ...current,
    ]);
    setForm({ name: "", phone: "" });
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <h3 className="mb-6 text-2xl font-black text-slate-950">Clientes</h3>
      <form onSubmit={addClient} className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-3">
        <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Nombre" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <input value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} placeholder="Telefono" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F]">
          Agregar cliente
        </button>
      </form>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {clients.map((client) => (
          <article key={client.id} className="rounded-2xl border border-slate-200 p-4">
            <p className="font-black text-slate-950">{client.name}</p>
            <p className="mt-1 text-sm text-slate-500">{client.phone}</p>
            <p className="mt-3 text-sm font-bold text-emerald-700">{client.visits} visitas registradas</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BarbersList({ barbers, setBarbers, appointments }) {
  const [form, setForm] = useState({ name: "", specialty: "", commission: "" });
  const addBarber = (event) => {
    event.preventDefault();
    if (!form.name.trim()) return;
    setBarbers((current) => [
      { id: Date.now(), name: form.name.trim(), specialty: form.specialty || "General", commission: Number(form.commission || 30) },
      ...current,
    ]);
    setForm({ name: "", specialty: "", commission: "" });
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <h3 className="mb-6 text-2xl font-black text-slate-950">Barberos</h3>
      <form onSubmit={addBarber} className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-4">
        <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Nombre" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <input value={form.specialty} onChange={(event) => setForm((current) => ({ ...current, specialty: event.target.value }))} placeholder="Especialidad" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] md:col-span-2" />
        <input type="number" value={form.commission} onChange={(event) => setForm((current) => ({ ...current, commission: event.target.value }))} placeholder="Comision %" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] md:col-span-4 md:w-fit">
          Agregar barbero
        </button>
      </form>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {barbers.map((barber) => {
          const completed = appointments.filter((item) => item.barber === barber.name && item.status === "Completado");
          const income = completed.reduce((sum, item) => sum + item.total, 0);
          return (
            <article key={barber.id} className="rounded-2xl border border-slate-200 p-4">
              <p className="font-black text-slate-950">{barber.name}</p>
              <p className="mt-1 text-sm text-slate-500">{barber.specialty}</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Servicios</p>
                  <p className="font-black text-slate-950">{completed.length}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Ingresos</p>
                  <p className="font-black text-slate-950">{currency.format(income)}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function IncomeReports({ appointments }) {
  const days = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
  const daily = days.map((day) => {
    const completed = appointments.filter((item) => item.day === day && item.status === "Completado");
    return {
      label: day,
      income: completed.reduce((sum, item) => sum + item.total, 0),
    };
  });
  const income = appointments
    .filter((item) => item.status === "Completado")
    .reduce((sum, item) => sum + item.total, 0);

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Ingresos</h3>
        <p className="mt-1 text-sm text-slate-500">Resumen de servicios completados e ingresos por dia.</p>
      </div>
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <ReportCard label="Ingresos totales" value={currency.format(income)} accent />
        <ReportCard label="Servicios cobrados" value={appointments.filter((item) => item.status === "Completado").length} />
        <ReportCard label="Pendientes" value={appointments.filter((item) => item.status !== "Completado").length} />
      </div>
      <ChartBox title="Ingresos por dia" data={daily} valueKey="income" />
    </section>
  );
}

function ReportCard({ label, value, accent = false }) {
  return (
    <article className="rounded-2xl border border-slate-200 p-5">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className={`mt-2 break-words text-2xl font-black ${accent ? "text-emerald-700" : "text-slate-950"}`}>{value}</p>
    </article>
  );
}

function ChartBox({ title, data, valueKey }) {
  const maxValue = Math.max(...data.map((item) => item[valueKey]), 1);
  return (
    <article className="rounded-2xl border border-slate-200 p-5">
      <p className="mb-4 font-black text-slate-950">{title}</p>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.label} className="grid grid-cols-[36px_1fr] items-center gap-x-3 gap-y-1 text-sm sm:grid-cols-[44px_1fr_92px]">
            <span className="font-bold text-slate-500">{item.label}</span>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[#00D38E]"
                style={{ width: `${Math.max(8, (item[valueKey] / maxValue) * 100)}%` }}
              />
            </div>
            <span className="col-start-2 text-left font-black text-slate-950 sm:col-start-auto sm:text-right">{currency.format(item[valueKey])}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default BarberiaDemo;
