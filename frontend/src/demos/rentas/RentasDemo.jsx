import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import DemoNotice from "../components/DemoNotice";

const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const currentDay = new Date().getDate();
const dueDay = 10;

const menuItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "unidades", label: "Departamentos" },
  { id: "inquilinos", label: "Inquilinos" },
  { id: "cobros", label: "Cobros" },
  { id: "contratos", label: "Contratos" },
  { id: "documentos", label: "Documentos" },
  { id: "calendario", label: "Calendario" },
  { id: "mantenimiento", label: "Mantenimiento" },
];

const initialUnits = [
  { id: 1, code: "A-101", address: "Av. Mitre 1200", type: "2 ambientes", monthlyRent: 280000, status: "Ocupado", tenant: "Laura Mendez", availableFrom: "Octubre", contractEnd: "30/09/2026" },
  { id: 2, code: "B-204", address: "San Martin 840", type: "Monoambiente", monthlyRent: 190000, status: "Disponible", tenant: "", availableFrom: "Ahora", contractEnd: "-" },
  { id: 3, code: "C-310", address: "Belgrano 515", type: "3 ambientes", monthlyRent: 360000, status: "Ocupado", tenant: "Carlos Diaz", availableFrom: "Enero", contractEnd: "31/12/2026" },
  { id: 4, code: "D-012", address: "Las Heras 92", type: "Casa", monthlyRent: 420000, status: "Reservado", tenant: "Sofia Romero", availableFrom: "Julio", contractEnd: "30/06/2026" },
];

const initialTenants = [
  {
    id: 1,
    name: "Laura Mendez",
    phone: "2604 330 982",
    email: "laura.mendez@mail.com",
    unit: "A-101",
    deposit: 280000,
    contractStart: "01/10/2025",
    contractEnd: "30/09/2026",
    guarantors: [
      { name: "Marcos Mendez", phone: "2604 440 228", relation: "Hermano" },
      { name: "Ana Ruiz", phone: "2604 887 113", relation: "Madre" },
    ],
  },
  {
    id: 2,
    name: "Carlos Diaz",
    phone: "2604 402 903",
    email: "carlos.diaz@mail.com",
    unit: "C-310",
    deposit: 360000,
    contractStart: "01/01/2026",
    contractEnd: "31/12/2026",
    guarantors: [
      { name: "Miguel Diaz", phone: "2604 901 300", relation: "Padre" },
      { name: "Veronica Sosa", phone: "2604 122 840", relation: "Companera" },
    ],
  },
  {
    id: 3,
    name: "Sofia Romero",
    phone: "2604 991 204",
    email: "sofia.romero@mail.com",
    unit: "D-012",
    deposit: 420000,
    contractStart: "01/07/2025",
    contractEnd: "30/06/2026",
    guarantors: [
      { name: "Martin Romero", phone: "2604 774 501", relation: "Padre" },
      { name: "Lucia Ponce", phone: "2604 337 850", relation: "Tia" },
    ],
  },
];

const initialPayments = [
  { id: "ALQ-901", tenant: "Laura Mendez", unit: "A-101", month: "Junio", baseAmount: 280000, paid: true, paidAt: "08/06", method: "Transferencia" },
  { id: "ALQ-902", tenant: "Carlos Diaz", unit: "C-310", month: "Junio", baseAmount: 360000, paid: false, paidAt: "-", method: "Pendiente" },
  { id: "ALQ-903", tenant: "Sofia Romero", unit: "D-012", month: "Junio", baseAmount: 420000, paid: false, paidAt: "-", method: "Pendiente" },
];

const initialDocuments = [
  { id: "DOC-41", tenant: "Laura Mendez", type: "Contrato firmado", status: "Adjunto", due: "Completo" },
  { id: "DOC-42", tenant: "Carlos Diaz", type: "DNI garante 2", status: "Pendiente", due: "Hoy" },
  { id: "DOC-43", tenant: "Sofia Romero", type: "Recibo de sueldo", status: "Pendiente", due: "Viernes" },
];

const initialMaintenance = [
  { id: "M-501", unit: "A-101", detail: "Revisar termotanque", priority: "Media", status: "Pendiente" },
  { id: "M-502", unit: "C-310", detail: "Cambio de cerradura", priority: "Alta", status: "En proceso" },
  { id: "M-503", unit: "B-204", detail: "Pintura antes de mostrar", priority: "Baja", status: "Pendiente" },
];

function RentasDemo() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [units, setUnits] = useState(initialUnits);
  const [tenants, setTenants] = useState(initialTenants);
  const [payments, setPayments] = useState(initialPayments);
  const [documents, setDocuments] = useState(initialDocuments);
  const [maintenance, setMaintenance] = useState(initialMaintenance);

  return (
    <main className="min-h-screen bg-slate-100">
      <aside className="fixed left-0 top-0 hidden h-screen w-72 overflow-y-auto border-r border-slate-200 bg-[#07111F] p-6 pb-36 text-white lg:block">
        <Link to="/" className="cursor-pointer block">
          <h1 className="text-2xl font-black">Proyecto Prisma</h1>
          <p className="mt-1 text-sm text-slate-400">Demo Alquileres</p>
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
          <p className="text-sm font-bold text-[#00D38E]">Regla de mora</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            El alquiler vence el dia 10. Luego suma 1% diario sobre el valor mensual.
          </p>
        </div>
      </aside>

      <section className="lg:ml-72">
        <div className="mx-auto max-w-7xl px-5 py-6 md:px-8">
          <MobileTop />
          <RentasHeader />
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

          <RentasStats units={units} payments={payments} documents={documents} tenants={tenants} />

          {activeSection === "dashboard" && (
            <>
              <div className="mt-8">
                <PaymentsPanel payments={payments} setPayments={setPayments} compact />
              </div>
              <div className="mt-8 grid gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                  <UnitsPanel units={units} setUnits={setUnits} compact />
                </div>
                <ContractsCalendar units={units} payments={payments} compact />
              </div>
            </>
          )}

          {activeSection === "unidades" && (
            <div className="mt-8">
              <UnitsPanel units={units} setUnits={setUnits} />
            </div>
          )}

          {activeSection === "inquilinos" && (
            <div className="mt-8">
              <TenantsPanel tenants={tenants} setTenants={setTenants} units={units} />
            </div>
          )}

          {activeSection === "cobros" && (
            <div className="mt-8">
              <PaymentsPanel payments={payments} setPayments={setPayments} />
            </div>
          )}

          {activeSection === "contratos" && (
            <div className="mt-8">
              <ContractsPanel tenants={tenants} units={units} />
            </div>
          )}

          {activeSection === "documentos" && (
            <div className="mt-8">
              <DocumentsPanel documents={documents} setDocuments={setDocuments} tenants={tenants} />
            </div>
          )}

          {activeSection === "calendario" && (
            <div className="mt-8">
              <ContractsCalendar units={units} payments={payments} />
            </div>
          )}

          {activeSection === "mantenimiento" && (
            <div className="mt-8">
              <MaintenancePanel maintenance={maintenance} setMaintenance={setMaintenance} units={units} />
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
        <h1 className="break-words text-xl font-black text-slate-950">Demo Alquileres</h1>
        <p className="text-sm text-slate-500">Proyecto Prisma</p>
      </div>
      <Link to="/" className="cursor-pointer shrink-0 rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white">
        Volver
      </Link>
    </div>
  );
}

function RentasHeader() {
  const whatsappMessage = encodeURIComponent(
    "Hola Federico, vi el demo de alquileres y quiero un sistema asi para administrar propiedades."
  );

  return (
    <header className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-bold text-[#00D38E]">Sistema demo</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950 md:text-4xl">
            Alquileres Prisma
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Administra alquileres mensuales, mora, depósitos, garantes, contratos y departamentos disponibles.
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

function RentasStats({ units, payments, documents, tenants }) {
  const available = units.filter((unit) => unit.status === "Disponible").length;
  const pendingAmount = payments.filter((payment) => !payment.paid).reduce((sum, payment) => sum + calculatePayment(payment).total, 0);
  const latePayments = payments.filter((payment) => !payment.paid && calculatePayment(payment).daysLate > 0).length;
  const pendingDocs = documents.filter((doc) => doc.status === "Pendiente").length;
  const depositTotal = tenants.reduce((sum, tenant) => sum + tenant.deposit, 0);
  const stats = [
    { label: "Disponibles", value: available, detail: `${units.length} propiedades` },
    { label: "Cobro pendiente", value: currency.format(pendingAmount), detail: `${latePayments} con mora` },
    { label: "Depositos", value: currency.format(depositTotal), detail: "Garantia registrada" },
    { label: "Documentos", value: pendingDocs, detail: "Pendientes de adjuntar" },
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

function UnitsPanel({ units, setUnits, compact = false }) {
  const [form, setForm] = useState({ code: "", address: "", type: "", monthlyRent: "", status: "Disponible", availableFrom: "Ahora", contractEnd: "-" });
  const updateForm = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const addUnit = (event) => {
    event.preventDefault();
    if (!form.code.trim() || !form.address.trim()) return;
    setUnits((current) => [
      { id: Date.now(), code: form.code.trim(), address: form.address.trim(), type: form.type || "Departamento", monthlyRent: Number(form.monthlyRent || 0), status: form.status, tenant: "", availableFrom: form.availableFrom, contractEnd: form.contractEnd },
      ...current,
    ]);
    setForm({ code: "", address: "", type: "", monthlyRent: "", status: "Disponible", availableFrom: "Ahora", contractEnd: "-" });
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Departamentos y propiedades</h3>
        <p className="mt-1 text-sm text-slate-500">Disponibilidad, alquiler mensual y vencimiento de contrato.</p>
      </div>

      {!compact && (
        <form onSubmit={addUnit} className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-6">
          <input value={form.code} onChange={(event) => updateForm("code", event.target.value)} placeholder="Unidad" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
          <input value={form.address} onChange={(event) => updateForm("address", event.target.value)} placeholder="Direccion" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2" />
          <input value={form.type} onChange={(event) => updateForm("type", event.target.value)} placeholder="Tipo" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
          <input type="number" value={form.monthlyRent} onChange={(event) => updateForm("monthlyRent", event.target.value)} placeholder="Alquiler mensual" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
          <select value={form.status} onChange={(event) => updateForm("status", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]">
            <option>Disponible</option>
            <option>Ocupado</option>
            <option>Reservado</option>
          </select>
          <input value={form.availableFrom} onChange={(event) => updateForm("availableFrom", event.target.value)} placeholder="Disponible desde" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
          <input value={form.contractEnd} onChange={(event) => updateForm("contractEnd", event.target.value)} placeholder="Vence contrato" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
          <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] lg:col-span-4 lg:w-fit">
            Agregar propiedad
          </button>
        </form>
      )}

      <div className={compact ? "grid gap-4 md:grid-cols-2" : "grid gap-4 md:grid-cols-2 xl:grid-cols-3"}>
        {units.map((unit) => (
          <article key={unit.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="break-words font-black text-slate-950">{unit.code} · {unit.type}</p>
                <p className="mt-1 break-words text-sm text-slate-500">{unit.address}</p>
              </div>
              <span className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-bold ${unitStatusClass(unit.status)}`}>{unit.status}</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <InfoBox label="Alquiler" value={currency.format(unit.monthlyRent)} />
              <InfoBox label="Disponible" value={unit.availableFrom} />
            </div>
            <div className="mt-3 rounded-xl bg-slate-50 p-3">
              <p className="text-xs font-bold text-slate-500">Contrato vence</p>
              <p className="mt-1 break-words font-black text-slate-950">{unit.contractEnd}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function TenantsPanel({ tenants, setTenants, units }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    unit: units[0]?.code ?? "",
    deposit: "",
    contractStart: "",
    contractEnd: "",
    guarantor1: "",
    guarantor1Phone: "",
    guarantor2: "",
    guarantor2Phone: "",
  });
  const updateForm = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const addTenant = (event) => {
    event.preventDefault();
    if (!form.name.trim()) return;
    setTenants((current) => [
      {
        id: Date.now(),
        name: form.name.trim(),
        phone: form.phone || "Sin telefono",
        email: form.email || "Sin email",
        unit: form.unit,
        deposit: Number(form.deposit || 0),
        contractStart: form.contractStart || "-",
        contractEnd: form.contractEnd || "-",
        guarantors: [
          { name: form.guarantor1 || "Garante 1 pendiente", phone: form.guarantor1Phone || "-", relation: "Garante" },
          { name: form.guarantor2 || "Garante 2 pendiente", phone: form.guarantor2Phone || "-", relation: "Garante" },
        ],
      },
      ...current,
    ]);
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Inquilinos y garantes</h3>
        <p className="mt-1 text-sm text-slate-500">Contacto del cliente, deposito y dos garantes asociados.</p>
      </div>

      <form onSubmit={addTenant} className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-6">
        <input value={form.name} onChange={(event) => updateForm("name", event.target.value)} placeholder="Inquilino" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2" />
        <input value={form.phone} onChange={(event) => updateForm("phone", event.target.value)} placeholder="Telefono" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <input value={form.email} onChange={(event) => updateForm("email", event.target.value)} placeholder="Email" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <select value={form.unit} onChange={(event) => updateForm("unit", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]">
          {units.map((unit) => <option key={unit.id}>{unit.code}</option>)}
        </select>
        <input type="number" value={form.deposit} onChange={(event) => updateForm("deposit", event.target.value)} placeholder="Deposito" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <input value={form.contractStart} onChange={(event) => updateForm("contractStart", event.target.value)} placeholder="Inicio contrato" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <input value={form.contractEnd} onChange={(event) => updateForm("contractEnd", event.target.value)} placeholder="Fin contrato" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <input value={form.guarantor1} onChange={(event) => updateForm("guarantor1", event.target.value)} placeholder="Garante 1" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <input value={form.guarantor1Phone} onChange={(event) => updateForm("guarantor1Phone", event.target.value)} placeholder="Telefono garante 1" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <input value={form.guarantor2} onChange={(event) => updateForm("guarantor2", event.target.value)} placeholder="Garante 2" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <input value={form.guarantor2Phone} onChange={(event) => updateForm("guarantor2Phone", event.target.value)} placeholder="Telefono garante 2" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] lg:col-span-6 lg:w-fit">
          Agregar inquilino
        </button>
      </form>

      <TenantCards tenants={tenants} />
    </section>
  );
}

function TenantCards({ tenants }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {tenants.map((tenant) => (
        <article key={tenant.id} className="rounded-2xl border border-slate-200 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="break-words font-black text-slate-950">{tenant.name}</p>
              <p className="mt-1 break-words text-sm text-slate-500">{tenant.phone} · {tenant.email}</p>
            </div>
            <span className="w-fit rounded-full bg-[#00D38E]/10 px-3 py-1 text-xs font-bold text-emerald-700">{tenant.unit}</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <InfoBox label="Deposito" value={currency.format(tenant.deposit)} />
            <InfoBox label="Contrato" value={tenant.contractEnd} />
          </div>
          <div className="mt-4 space-y-2">
            {tenant.guarantors.map((guarantor) => (
              <div key={`${tenant.id}-${guarantor.name}`} className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs font-bold text-slate-500">{guarantor.relation}</p>
                <p className="break-words font-black text-slate-950">{guarantor.name}</p>
                <p className="text-sm text-slate-500">{guarantor.phone}</p>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function PaymentsPanel({ payments, setPayments, compact = false }) {
  const markPaid = (paymentId) => {
    setPayments((current) => current.map((payment) => payment.id === paymentId ? { ...payment, paid: true, paidAt: "Ahora", method: "Cobrado" } : payment));
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Cobros mensuales</h3>
        <p className="mt-1 text-sm text-slate-500">
          Vencen el dia 10. Desde el dia 11 se suma 1% diario sobre el alquiler.
        </p>
      </div>

      <div className={compact ? "grid gap-4 md:grid-cols-2 xl:grid-cols-3" : "grid gap-4 md:grid-cols-2 xl:grid-cols-3"}>
        {payments.map((payment) => {
          const calculated = calculatePayment(payment);
          return (
            <article key={payment.id} className={`rounded-2xl border p-4 ${calculated.daysLate > 0 && !payment.paid ? "border-amber-200 bg-amber-50/50" : "border-slate-200"}`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-black text-slate-400">{payment.id}</p>
                  <p className="mt-1 break-words font-black text-slate-950">{payment.tenant}</p>
                  <p className="mt-1 text-sm text-slate-500">{payment.unit} · {payment.month}</p>
                </div>
                <span className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-bold ${payment.paid ? "bg-[#00D38E]/10 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  {payment.paid ? "Pagado" : "Pendiente"}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <InfoBox label="Alquiler" value={currency.format(payment.baseAmount)} />
                <InfoBox label="Mora" value={currency.format(calculated.lateFee)} />
              </div>
              <div className="mt-4 rounded-xl bg-white p-3">
                <p className="text-xs font-bold text-slate-500">Total a cobrar</p>
                <p className="mt-1 text-2xl font-black text-slate-950">{currency.format(calculated.total)}</p>
                {!payment.paid && calculated.daysLate > 0 && (
                  <p className="mt-1 text-xs font-bold text-amber-700">
                    {calculated.daysLate} dias de mora desde el dia {dueDay}
                  </p>
                )}
              </div>
              {!payment.paid && (
                <button type="button" onClick={() => markPaid(payment.id)} className="cursor-pointer mt-4 w-full rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F]">
                  Marcar cobrado
                </button>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ContractsPanel({ tenants, units }) {
  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Contratos y depósitos</h3>
        <p className="mt-1 text-sm text-slate-500">Inicio, vencimiento, unidad alquilada y depósito de garantía.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tenants.map((tenant) => {
          const unit = units.find((item) => item.code === tenant.unit);
          return (
            <article key={tenant.id} className="rounded-2xl border border-slate-200 p-4">
              <p className="break-words font-black text-slate-950">{tenant.name}</p>
              <p className="mt-1 text-sm text-slate-500">{tenant.unit} · {unit?.address ?? "Sin direccion"}</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <InfoBox label="Inicio" value={tenant.contractStart} />
                <InfoBox label="Vence" value={tenant.contractEnd} />
                <InfoBox label="Alquiler" value={currency.format(unit?.monthlyRent ?? 0)} />
                <InfoBox label="Deposito" value={currency.format(tenant.deposit)} />
              </div>
              <button type="button" className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-500">
                Adjuntar contrato
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function DocumentsPanel({ documents, setDocuments, tenants }) {
  const [form, setForm] = useState({ tenant: tenants[0]?.name ?? "", type: "", due: "Hoy" });
  const updateForm = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const addDocument = (event) => {
    event.preventDefault();
    if (!form.type.trim()) return;
    setDocuments((current) => [
      { id: `DOC-${60 + current.length}`, tenant: form.tenant, type: form.type.trim(), status: "Pendiente", due: form.due },
      ...current,
    ]);
    setForm((current) => ({ ...current, type: "" }));
  };

  const markAttached = (documentId) => {
    setDocuments((current) => current.map((doc) => doc.id === documentId ? { ...doc, status: "Adjunto", due: "Completo" } : doc));
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Documentos adjuntos</h3>
        <p className="mt-1 text-sm text-slate-500">Contratos, DNI, recibos, garantías y archivos de cada inquilino.</p>
      </div>
      <form onSubmit={addDocument} className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-4">
        <select value={form.tenant} onChange={(event) => updateForm("tenant", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]">
          {tenants.map((tenant) => <option key={tenant.id}>{tenant.name}</option>)}
        </select>
        <input value={form.type} onChange={(event) => updateForm("type", event.target.value)} placeholder="Documento" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2" />
        <select value={form.due} onChange={(event) => updateForm("due", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]">
          <option>Hoy</option>
          <option>Viernes</option>
          <option>Completo</option>
        </select>
        <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] lg:col-span-4 lg:w-fit">
          Agregar documento
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {documents.map((doc) => (
          <article key={doc.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-black text-slate-400">{doc.id}</p>
                <p className="mt-1 break-words font-black text-slate-950">{doc.type}</p>
                <p className="mt-1 break-words text-sm text-slate-500">{doc.tenant}</p>
              </div>
              <span className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-bold ${doc.status === "Adjunto" ? "bg-[#00D38E]/10 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{doc.status}</span>
            </div>
            <p className="mt-3 text-sm font-bold text-slate-500">Estado: {doc.due}</p>
            {doc.status !== "Adjunto" && (
              <button type="button" onClick={() => markAttached(doc.id)} className="cursor-pointer mt-4 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
                Simular adjunto
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function ContractsCalendar({ units, payments, compact = false }) {
  const months = ["Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre"];
  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Calendario de alquileres</h3>
        <p className="mt-1 text-sm text-slate-500">Disponibilidad por mes, vencimientos de alquiler y fin de contrato.</p>
      </div>
      <div className={compact ? "space-y-3" : "grid gap-4 md:grid-cols-2 xl:grid-cols-3"}>
        {months.map((month) => {
          const available = units.filter((unit) => unit.status === "Disponible" || unit.availableFrom === month);
          const contractEnds = units.filter((unit) => unit.contractEnd.includes(month.slice(0, 3)) || unit.availableFrom === month);
          const monthPayments = payments.filter((payment) => payment.month === month);
          return (
            <article key={month} className="rounded-2xl border border-slate-200 p-4">
              <p className="font-black text-slate-950">{month}</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <InfoBox label="Disponibles" value={available.length} />
                <InfoBox label="Cobros" value={monthPayments.length || "-"} />
              </div>
              <div className="mt-4 space-y-2">
                {available.slice(0, 3).map((unit) => (
                  <p key={`${month}-${unit.code}`} className="rounded-xl bg-[#00D38E]/10 px-3 py-2 text-sm font-bold text-emerald-700">
                    {unit.code} disponible {unit.availableFrom}
                  </p>
                ))}
                {contractEnds.slice(0, 2).map((unit) => (
                  <p key={`${month}-${unit.code}-end`} className="rounded-xl bg-amber-50 px-3 py-2 text-sm font-bold text-amber-700">
                    {unit.code} vence contrato {unit.contractEnd}
                  </p>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function MaintenancePanel({ maintenance, setMaintenance, units }) {
  const [form, setForm] = useState({ unit: units[0]?.code ?? "", detail: "", priority: "Media" });
  const updateForm = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const addMaintenance = (event) => {
    event.preventDefault();
    if (!form.detail.trim()) return;
    setMaintenance((current) => [
      { id: `M-${520 + current.length}`, unit: form.unit, detail: form.detail.trim(), priority: form.priority, status: "Pendiente" },
      ...current,
    ]);
    setForm((current) => ({ ...current, detail: "" }));
  };

  const updateStatus = (maintenanceId, status) => {
    setMaintenance((current) => current.map((item) => item.id === maintenanceId ? { ...item, status } : item));
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Mantenimiento</h3>
        <p className="mt-1 text-sm text-slate-500">Tareas pendientes por propiedad y seguimiento de estado.</p>
      </div>
      <form onSubmit={addMaintenance} className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-4">
        <select value={form.unit} onChange={(event) => updateForm("unit", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]">
          {units.map((unit) => <option key={unit.id}>{unit.code}</option>)}
        </select>
        <input value={form.detail} onChange={(event) => updateForm("detail", event.target.value)} placeholder="Detalle" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2" />
        <select value={form.priority} onChange={(event) => updateForm("priority", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]">
          <option>Baja</option>
          <option>Media</option>
          <option>Alta</option>
        </select>
        <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] lg:col-span-4 lg:w-fit">
          Agregar tarea
        </button>
      </form>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {maintenance.map((item) => (
          <article key={item.id} className="rounded-2xl border border-slate-200 p-4">
            <p className="text-xs font-black text-slate-400">{item.id}</p>
            <p className="mt-1 break-words font-black text-slate-950">{item.unit}</p>
            <p className="mt-1 break-words text-sm text-slate-500">{item.detail}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${priorityClass(item.priority)}`}>{item.priority}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{item.status}</span>
            </div>
            <select value={item.status} onChange={(event) => updateStatus(item.id, event.target.value)} className="mt-4 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold outline-none focus:border-[#00D38E]">
              <option>Pendiente</option>
              <option>En proceso</option>
              <option>Resuelto</option>
            </select>
          </article>
        ))}
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

function calculatePayment(payment) {
  if (payment.paid) return { daysLate: 0, lateFee: 0, total: payment.baseAmount };
  const daysLate = Math.max(0, currentDay - dueDay);
  const lateFee = Math.round(payment.baseAmount * 0.01 * daysLate);
  return { daysLate, lateFee, total: payment.baseAmount + lateFee };
}

function unitStatusClass(status) {
  if (status === "Disponible") return "bg-[#00D38E]/10 text-emerald-700";
  if (status === "Reservado") return "bg-sky-100 text-sky-700";
  return "bg-amber-100 text-amber-700";
}

function priorityClass(priority) {
  if (priority === "Alta") return "bg-red-100 text-red-700";
  if (priority === "Media") return "bg-amber-100 text-amber-700";
  return "bg-[#00D38E]/10 text-emerald-700";
}

export default RentasDemo;
