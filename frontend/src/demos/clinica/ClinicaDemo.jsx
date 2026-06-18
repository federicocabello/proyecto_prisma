import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import DemoNotice from "../components/DemoNotice";

const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const menuItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "pacientes", label: "Pacientes" },
  { id: "citas", label: "Citas" },
  { id: "agenda", label: "Agenda" },
  { id: "documentos", label: "Documentos" },
  { id: "pagos", label: "Pagos" },
  { id: "reportes", label: "Reportes" },
];

const initialPatients = [
  { id: 1, name: "Laura Mendez", phone: "2604 330 982", plan: "OSDE", lastVisit: "12/06", debt: 0, status: "Activo" },
  { id: 2, name: "Carlos Diaz", phone: "2604 402 903", plan: "Particular", lastVisit: "10/06", debt: 18500, status: "Pendiente" },
  { id: 3, name: "Sofia Romero", phone: "2604 991 204", plan: "Swiss Medical", lastVisit: "08/06", debt: 0, status: "Activo" },
  { id: 4, name: "Pedro Gomez", phone: "2604 884 112", plan: "Particular", lastVisit: "05/06", debt: 12000, status: "Control" },
];

const initialAppointments = [
  { id: "C-301", patient: "Laura Mendez", doctor: "Dra. Alvarez", specialty: "Clinica general", date: "Hoy", time: "09:00", reason: "Control general", status: "Atendido", day: "Lun", amount: 22000, paid: true },
  { id: "C-302", patient: "Carlos Diaz", doctor: "Dr. Perez", specialty: "Traumatologia", date: "Hoy", time: "10:30", reason: "Dolor de rodilla", status: "Pendiente", day: "Mar", amount: 18500, paid: false },
  { id: "C-303", patient: "Sofia Romero", doctor: "Dra. Alvarez", specialty: "Clinica general", date: "Manana", time: "11:00", reason: "Chequeo anual", status: "Confirmado", day: "Mie", amount: 22000, paid: true },
  { id: "C-304", patient: "Pedro Gomez", doctor: "Lic. Castro", specialty: "Kinesiologia", date: "Viernes", time: "16:00", reason: "Rehabilitacion", status: "Confirmado", day: "Vie", amount: 12000, paid: false },
];

const initialDocuments = [
  { id: "D-81", patient: "Carlos Diaz", type: "Radiografia", status: "Pendiente", due: "Hoy" },
  { id: "D-82", patient: "Laura Mendez", type: "Analisis de sangre", status: "Recibido", due: "Ayer" },
  { id: "D-83", patient: "Pedro Gomez", type: "Orden medica", status: "Pendiente", due: "Viernes" },
];

const initialPayments = [
  { id: "P-701", patient: "Laura Mendez", amount: 22000, method: "Transferencia", status: "Pagado", date: "Hoy", day: "Lun" },
  { id: "P-702", patient: "Carlos Diaz", amount: 18500, method: "Pendiente", status: "Pendiente", date: "Hoy", day: "Mar" },
  { id: "P-703", patient: "Pedro Gomez", amount: 12000, method: "Pendiente", status: "Pendiente", date: "Viernes", day: "Vie" },
];

function ClinicaDemo() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [patients, setPatients] = useState(initialPatients);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [documents, setDocuments] = useState(initialDocuments);
  const [payments, setPayments] = useState(initialPayments);

  return (
    <main className="min-h-screen bg-slate-100">
      <aside className="fixed left-0 top-0 hidden h-screen w-72 overflow-y-auto border-r border-slate-200 bg-[#07111F] p-6 pb-36 text-white lg:block">
        <Link to="/" className="cursor-pointer block">
          <h1 className="text-2xl font-black">Proyecto Prisma</h1>
          <p className="mt-1 text-sm text-slate-400">Demo Clinica</p>
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

        <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/10 p-4">
          <p className="text-sm font-bold text-[#00D38E]">Demo activa</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            Datos temporales para mostrar turnos, pacientes, pagos y documentos.
          </p>
        </div>
      </aside>

      <section className="lg:ml-72">
        <div className="mx-auto max-w-7xl px-5 py-6 md:px-8">
          <MobileTop />
          <ClinicaHeader />
          <DemoNotice />

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

          <ClinicaStats patients={patients} appointments={appointments} documents={documents} payments={payments} />

          {activeSection === "dashboard" && (
            <>
              <div className="mt-8">
                <QuickAppointment
                  patients={patients}
                  setPatients={setPatients}
                  appointments={appointments}
                  setAppointments={setAppointments}
                  setPayments={setPayments}
                />
              </div>
              <div className="mt-8 grid gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                  <AppointmentsList appointments={appointments} setAppointments={setAppointments} compact />
                </div>
                <DocumentsList documents={documents} setDocuments={setDocuments} patients={patients} compact />
              </div>
            </>
          )}

          {activeSection === "pacientes" && (
            <div className="mt-8">
              <PatientsList patients={patients} setPatients={setPatients} />
            </div>
          )}

          {activeSection === "citas" && (
            <div className="mt-8">
              <AppointmentsList appointments={appointments} setAppointments={setAppointments} />
            </div>
          )}

          {activeSection === "agenda" && (
            <div className="mt-8">
              <Agenda appointments={appointments} setAppointments={setAppointments} />
            </div>
          )}

          {activeSection === "documentos" && (
            <div className="mt-8">
              <DocumentsList documents={documents} setDocuments={setDocuments} patients={patients} />
            </div>
          )}

          {activeSection === "pagos" && (
            <div className="mt-8">
              <PaymentsList payments={payments} setPayments={setPayments} patients={patients} setPatients={setPatients} />
            </div>
          )}

          {activeSection === "reportes" && (
            <div className="mt-8">
              <ClinicReports appointments={appointments} payments={payments} patients={patients} documents={documents} />
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
        <h1 className="break-words text-xl font-black text-slate-950">Demo Clinica</h1>
        <p className="text-sm text-slate-500">Proyecto Prisma</p>
      </div>
      <Link to="/" className="cursor-pointer shrink-0 rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white">
        Volver
      </Link>
    </div>
  );
}

function ClinicaHeader() {
  const whatsappMessage = encodeURIComponent(
    "Hola Federico, vi el demo de clinica y quiero un sistema asi para mi consultorio."
  );

  return (
    <header className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-bold text-[#00D38E]">Sistema demo</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950 md:text-4xl">
            Clinica Prisma
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Organiza turnos, pacientes, agenda medica, documentos pendientes y pagos.
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

function ClinicaStats({ patients, appointments, documents, payments }) {
  const pendingAppointments = appointments.filter((item) => item.status !== "Atendido").length;
  const pendingDocs = documents.filter((item) => item.status === "Pendiente").length;
  const pendingPayments = payments.filter((item) => item.status === "Pendiente").reduce((sum, item) => sum + item.amount, 0);
  const paidTotal = payments.filter((item) => item.status === "Pagado").reduce((sum, item) => sum + item.amount, 0);
  const stats = [
    { label: "Pacientes", value: patients.length, detail: "Base temporal" },
    { label: "Turnos activos", value: pendingAppointments, detail: `${appointments.length} citas cargadas` },
    { label: "Documentos", value: pendingDocs, detail: "Pendientes de recibir" },
    { label: "Cobrado", value: currency.format(paidTotal), detail: `${currency.format(pendingPayments)} pendiente` },
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

function QuickAppointment({ patients, setPatients, appointments, setAppointments, setPayments }) {
  const [form, setForm] = useState({
    patient: patients[0]?.name ?? "",
    phone: "",
    doctor: "Dra. Alvarez",
    specialty: "Clinica general",
    date: "Hoy",
    time: "12:00",
    reason: "",
    amount: 22000,
  });

  const updateForm = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const saveAppointment = (event) => {
    event.preventDefault();
    if (!form.patient.trim()) return;

    const knownPatient = patients.some((patient) => patient.name === form.patient.trim());
    if (!knownPatient) {
      setPatients((current) => [
        { id: Date.now(), name: form.patient.trim(), phone: form.phone || "Sin telefono", plan: "Particular", lastVisit: "Nuevo", debt: 0, status: "Nuevo" },
        ...current,
      ]);
    }

    const nextId = appointments.length + 310;
    setAppointments((current) => [
      {
        id: `C-${nextId}`,
        patient: form.patient.trim(),
        doctor: form.doctor,
        specialty: form.specialty,
        date: form.date,
        time: form.time,
        reason: form.reason || "Consulta",
        status: "Pendiente",
        day: "Vie",
        amount: Number(form.amount || 0),
        paid: false,
      },
      ...current,
    ]);

    setPayments((current) => [
      { id: `P-${720 + current.length}`, patient: form.patient.trim(), amount: Number(form.amount || 0), method: "Pendiente", status: "Pendiente", date: form.date, day: "Vie" },
      ...current,
    ]);

    setForm((current) => ({ ...current, reason: "", time: "12:00" }));
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Agendar cita rapida</h3>
        <p className="mt-1 text-sm text-slate-500">Carga paciente, profesional, horario y valor de consulta.</p>
      </div>

      <form onSubmit={saveAppointment} className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-6">
        <input value={form.patient} onChange={(event) => updateForm("patient", event.target.value)} placeholder="Paciente" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2" />
        <input value={form.phone} onChange={(event) => updateForm("phone", event.target.value)} placeholder="Telefono nuevo paciente" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <select value={form.doctor} onChange={(event) => updateForm("doctor", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]">
          <option>Dra. Alvarez</option>
          <option>Dr. Perez</option>
          <option>Lic. Castro</option>
        </select>
        <select value={form.specialty} onChange={(event) => updateForm("specialty", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]">
          <option>Clinica general</option>
          <option>Traumatologia</option>
          <option>Kinesiologia</option>
          <option>Odontologia</option>
          <option>Psicologia</option>
        </select>
        <select value={form.date} onChange={(event) => updateForm("date", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]">
          <option>Hoy</option>
          <option>Manana</option>
          <option>Viernes</option>
          <option>Sabado</option>
        </select>
        <input type="time" value={form.time} onChange={(event) => updateForm("time", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <input value={form.reason} onChange={(event) => updateForm("reason", event.target.value)} placeholder="Motivo" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2" />
        <input type="number" min="0" value={form.amount} onChange={(event) => updateForm("amount", event.target.value)} placeholder="Valor consulta" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] lg:col-span-2">
          Guardar cita
        </button>
      </form>
    </section>
  );
}

function PatientsList({ patients, setPatients }) {
  const [form, setForm] = useState({ name: "", phone: "", plan: "Particular", debt: "" });
  const updateForm = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const addPatient = (event) => {
    event.preventDefault();
    if (!form.name.trim()) return;
    setPatients((current) => [
      { id: Date.now(), name: form.name.trim(), phone: form.phone || "Sin telefono", plan: form.plan, lastVisit: "Nuevo", debt: Number(form.debt || 0), status: "Activo" },
      ...current,
    ]);
    setForm({ name: "", phone: "", plan: "Particular", debt: "" });
  };

  const clearDebt = (patientId) => {
    setPatients((current) => current.map((patient) => patient.id === patientId ? { ...patient, debt: 0 } : patient));
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Pacientes</h3>
        <p className="mt-1 text-sm text-slate-500">Ficha simple con contacto, cobertura y saldos pendientes.</p>
      </div>

      <form onSubmit={addPatient} className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-5">
        <input value={form.name} onChange={(event) => updateForm("name", event.target.value)} placeholder="Nombre del paciente" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2" />
        <input value={form.phone} onChange={(event) => updateForm("phone", event.target.value)} placeholder="Telefono" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <select value={form.plan} onChange={(event) => updateForm("plan", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]">
          <option>Particular</option>
          <option>OSDE</option>
          <option>Swiss Medical</option>
          <option>Galeno</option>
          <option>PAMI</option>
        </select>
        <input type="number" min="0" value={form.debt} onChange={(event) => updateForm("debt", event.target.value)} placeholder="Saldo pendiente" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] lg:col-span-5 lg:w-fit">
          Agregar paciente
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {patients.map((patient) => (
          <article key={patient.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="break-words font-black text-slate-950">{patient.name}</p>
                <p className="mt-1 text-sm text-slate-500">{patient.phone}</p>
              </div>
              <span className="w-fit shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{patient.plan}</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <InfoBox label="Ultima visita" value={patient.lastVisit} />
              <InfoBox label="Estado" value={patient.status} />
            </div>
            <div className="mt-4 rounded-xl bg-slate-50 p-3">
              <p className="text-xs font-bold text-slate-500">Saldo pendiente</p>
              <p className={patient.debt > 0 ? "mt-1 text-xl font-black text-amber-700" : "mt-1 text-xl font-black text-emerald-700"}>
                {patient.debt > 0 ? currency.format(patient.debt) : "Al dia"}
              </p>
            </div>
            {patient.debt > 0 && (
              <button type="button" onClick={() => clearDebt(patient.id)} className="cursor-pointer mt-4 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
                Marcar cobrado
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function AppointmentsList({ appointments, setAppointments, compact = false }) {
  const updateStatus = (appointmentId, status) => {
    setAppointments((current) => current.map((item) => item.id === appointmentId ? { ...item, status } : item));
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">{compact ? "Proximas citas" : "Citas registradas"}</h3>
        <p className="mt-1 text-sm text-slate-500">Controla horarios, profesional, motivo y estado.</p>
      </div>

      <div className={compact ? "grid gap-4 md:grid-cols-2" : "grid gap-4 md:grid-cols-2 xl:grid-cols-3"}>
        {appointments.map((item) => (
          <article key={item.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-black text-slate-400">{item.id}</p>
                <p className="mt-1 break-words font-black text-slate-950">{item.patient}</p>
                <p className="mt-1 break-words text-sm text-slate-500">{item.doctor} · {item.specialty}</p>
              </div>
              <span className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-bold ${statusClass(item.status)}`}>{item.status}</span>
            </div>
            <p className="mt-3 break-words text-sm text-slate-500">{item.reason}</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
              <InfoBox label="Dia" value={item.date} />
              <InfoBox label="Hora" value={item.time} />
              <InfoBox label="Valor" value={currency.format(item.amount)} />
            </div>
            <select value={item.status} onChange={(event) => updateStatus(item.id, event.target.value)} className="mt-4 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold outline-none focus:border-[#00D38E]">
              <option>Pendiente</option>
              <option>Confirmado</option>
              <option>Atendido</option>
              <option>Cancelado</option>
            </select>
          </article>
        ))}
      </div>
    </section>
  );
}

function Agenda({ appointments, setAppointments }) {
  const days = ["Hoy", "Manana", "Viernes", "Sabado"];
  const grouped = days.map((day) => ({
    day,
    items: appointments.filter((item) => item.date === day).sort((a, b) => a.time.localeCompare(b.time)),
  }));

  const markAttended = (appointmentId) => {
    setAppointments((current) => current.map((item) => item.id === appointmentId ? { ...item, status: "Atendido" } : item));
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <h3 className="mb-6 text-2xl font-black text-slate-950">Agenda medica</h3>
      <div className="grid gap-4 xl:grid-cols-4">
        {grouped.map((group) => (
          <article key={group.day} className="rounded-2xl border border-slate-200 p-4">
            <p className="mb-4 font-black text-slate-950">{group.day}</p>
            <div className="space-y-3">
              {group.items.map((item) => (
                <div key={item.id} className="rounded-xl bg-slate-50 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-black text-slate-950">{item.time}</p>
                    <span className={`w-fit rounded-full px-2 py-1 text-[11px] font-bold ${statusClass(item.status)}`}>{item.status}</span>
                  </div>
                  <p className="mt-2 break-words text-sm font-bold text-slate-800">{item.patient}</p>
                  <p className="text-xs text-slate-500">{item.doctor}</p>
                  {item.status !== "Atendido" && (
                    <button type="button" onClick={() => markAttended(item.id)} className="cursor-pointer mt-3 w-full rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-700">
                      Marcar atendido
                    </button>
                  )}
                </div>
              ))}
              {!group.items.length && (
                <p className="rounded-xl bg-slate-50 p-3 text-sm font-bold text-slate-400">Sin citas</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DocumentsList({ documents, setDocuments, patients, compact = false }) {
  const [form, setForm] = useState({ patient: patients[0]?.name ?? "", type: "", due: "Hoy" });
  const updateForm = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const addDocument = (event) => {
    event.preventDefault();
    if (!form.type.trim()) return;
    setDocuments((current) => [
      { id: `D-${90 + current.length}`, patient: form.patient, type: form.type.trim(), status: "Pendiente", due: form.due },
      ...current,
    ]);
    setForm((current) => ({ ...current, type: "" }));
  };

  const markReceived = (documentId) => {
    setDocuments((current) => current.map((doc) => doc.id === documentId ? { ...doc, status: "Recibido" } : doc));
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Documentos</h3>
        <p className="mt-1 text-sm text-slate-500">Estudios, ordenes y archivos pendientes por paciente.</p>
      </div>

      {!compact && (
        <form onSubmit={addDocument} className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-4">
          <select value={form.patient} onChange={(event) => updateForm("patient", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]">
            {patients.map((patient) => <option key={patient.id}>{patient.name}</option>)}
          </select>
          <input value={form.type} onChange={(event) => updateForm("type", event.target.value)} placeholder="Documento o estudio" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2" />
          <select value={form.due} onChange={(event) => updateForm("due", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]">
            <option>Hoy</option>
            <option>Manana</option>
            <option>Viernes</option>
          </select>
          <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] lg:col-span-4 lg:w-fit">
            Agregar documento
          </button>
        </form>
      )}

      <div className={compact ? "space-y-3" : "grid gap-4 md:grid-cols-2 xl:grid-cols-3"}>
        {documents.map((doc) => (
          <article key={doc.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-black text-slate-400">{doc.id}</p>
                <p className="mt-1 break-words font-black text-slate-950">{doc.type}</p>
                <p className="mt-1 break-words text-sm text-slate-500">{doc.patient}</p>
              </div>
              <span className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-bold ${doc.status === "Recibido" ? "bg-[#00D38E]/10 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{doc.status}</span>
            </div>
            <p className="mt-3 text-sm font-bold text-slate-500">Entrega: {doc.due}</p>
            {doc.status !== "Recibido" && (
              <button type="button" onClick={() => markReceived(doc.id)} className="cursor-pointer mt-4 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
                Marcar recibido
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function PaymentsList({ payments, setPayments, patients, setPatients }) {
  const [form, setForm] = useState({ patient: patients[0]?.name ?? "", amount: "", method: "Efectivo" });
  const updateForm = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const addPayment = (event) => {
    event.preventDefault();
    if (!form.patient || !Number(form.amount)) return;
    setPayments((current) => [
      { id: `P-${740 + current.length}`, patient: form.patient, amount: Number(form.amount), method: form.method, status: "Pagado", date: "Ahora", day: "Vie" },
      ...current,
    ]);
    setPatients((current) => current.map((patient) => patient.name === form.patient ? { ...patient, debt: Math.max(0, patient.debt - Number(form.amount)) } : patient));
    setForm((current) => ({ ...current, amount: "" }));
  };

  const markPaid = (paymentId) => {
    setPayments((current) => current.map((payment) => payment.id === paymentId ? { ...payment, status: "Pagado", method: "Cobrado" } : payment));
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Pagos</h3>
        <p className="mt-1 text-sm text-slate-500">Registra cobros y controla saldos pendientes.</p>
      </div>

      <form onSubmit={addPayment} className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-4">
        <select value={form.patient} onChange={(event) => updateForm("patient", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]">
          {patients.map((patient) => <option key={patient.id}>{patient.name}</option>)}
        </select>
        <input type="number" min="0" value={form.amount} onChange={(event) => updateForm("amount", event.target.value)} placeholder="Importe" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <select value={form.method} onChange={(event) => updateForm("method", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]">
          <option>Efectivo</option>
          <option>Transferencia</option>
          <option>Tarjeta</option>
          <option>Obra social</option>
        </select>
        <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F]">
          Registrar pago
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {payments.map((payment) => (
          <article key={payment.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-black text-slate-400">{payment.id}</p>
                <p className="mt-1 break-words font-black text-slate-950">{payment.patient}</p>
                <p className="mt-1 text-sm text-slate-500">{payment.method} · {payment.date}</p>
              </div>
              <span className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-bold ${payment.status === "Pagado" ? "bg-[#00D38E]/10 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{payment.status}</span>
            </div>
            <p className="mt-4 text-2xl font-black text-slate-950">{currency.format(payment.amount)}</p>
            {payment.status !== "Pagado" && (
              <button type="button" onClick={() => markPaid(payment.id)} className="cursor-pointer mt-4 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
                Marcar cobrado
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function ClinicReports({ appointments, payments, patients, documents }) {
  const days = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
  const daily = days.map((day) => {
    const dayPayments = payments.filter((payment) => payment.day === day && payment.status === "Pagado");
    const dayAppointments = appointments.filter((appointment) => appointment.day === day);
    return {
      label: day,
      income: dayPayments.reduce((sum, payment) => sum + payment.amount, 0),
      appointments: dayAppointments.length,
    };
  });
  const income = payments.filter((payment) => payment.status === "Pagado").reduce((sum, payment) => sum + payment.amount, 0);
  const pending = payments.filter((payment) => payment.status === "Pendiente").reduce((sum, payment) => sum + payment.amount, 0);
  const pendingDocs = documents.filter((doc) => doc.status === "Pendiente").length;

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Reportes</h3>
        <p className="mt-1 text-sm text-slate-500">Turnos, ingresos, pagos pendientes y documentos.</p>
      </div>
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <ReportCard label="Ingresos" value={currency.format(income)} accent />
        <ReportCard label="Pendiente" value={currency.format(pending)} />
        <ReportCard label="Pacientes" value={patients.length} />
        <ReportCard label="Documentos" value={pendingDocs} />
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <ChartBox title="Ingresos por dia" data={daily} valueKey="income" />
        <ChartBox title="Turnos por dia" data={daily} valueKey="appointments" dark numberOnly />
      </div>
    </section>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="break-words font-black text-slate-950">{value}</p>
    </div>
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

function ChartBox({ title, data, valueKey, dark = false, numberOnly = false }) {
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
                className={`h-full rounded-full ${dark ? "bg-slate-950" : "bg-[#00D38E]"}`}
                style={{ width: `${Math.max(8, (item[valueKey] / maxValue) * 100)}%` }}
              />
            </div>
            <span className="col-start-2 text-left font-black text-slate-950 sm:col-start-auto sm:text-right">
              {numberOnly ? item[valueKey] : currency.format(item[valueKey])}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

function statusClass(status) {
  if (status === "Atendido" || status === "Confirmado") return "bg-[#00D38E]/10 text-emerald-700";
  if (status === "Cancelado") return "bg-red-100 text-red-700";
  return "bg-amber-100 text-amber-700";
}

export default ClinicaDemo;
