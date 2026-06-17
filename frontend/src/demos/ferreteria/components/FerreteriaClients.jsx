import { useState } from "react";

const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

function FerreteriaClients({ clients, setClients }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: "Particular",
    debt: "",
  });

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const addClient = (event) => {
    event.preventDefault();
    if (!form.name.trim()) return;

    setClients((current) => [
      {
        id: Date.now(),
        name: form.name.trim(),
        phone: form.phone.trim() || "Sin telefono",
        type: form.type,
        debt: Number(form.debt || 0),
      },
      ...current,
    ]);

    setForm({ name: "", phone: "", type: "Particular", debt: "" });
  };

  const clearDebt = (clientId) => {
    setClients((current) =>
      current.map((client) =>
        client.id === clientId ? { ...client, debt: 0 } : client
      )
    );
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Clientes</h3>
        <p className="mt-1 text-sm text-slate-500">
          Agenda de clientes, tipo de cuenta y saldos pendientes.
        </p>
      </div>

      <form
        onSubmit={addClient}
        className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-5"
      >
        <input
          value={form.name}
          onChange={(event) => updateForm("name", event.target.value)}
          placeholder="Nombre del cliente"
          className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2"
        />
        <input
          value={form.phone}
          onChange={(event) => updateForm("phone", event.target.value)}
          placeholder="Telefono"
          className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
        />
        <select
          value={form.type}
          onChange={(event) => updateForm("type", event.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
        >
          <option>Particular</option>
          <option>Empresa</option>
          <option>Cuenta corriente</option>
        </select>
        <input
          type="number"
          min="0"
          value={form.debt}
          onChange={(event) => updateForm("debt", event.target.value)}
          placeholder="Saldo pendiente"
          className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
        />
        <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] lg:col-span-5 lg:w-fit">
          Agregar cliente
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {clients.map((client) => (
          <article key={client.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="break-words font-black text-slate-950">{client.name}</p>
                <p className="mt-1 text-sm text-slate-500">{client.phone}</p>
              </div>
              <span className="w-fit shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                {client.type}
              </span>
            </div>

            <div className="mt-4 rounded-xl bg-slate-50 p-3">
              <p className="text-xs font-bold text-slate-500">Saldo pendiente</p>
              <p className={client.debt > 0 ? "mt-1 text-xl font-black text-amber-700" : "mt-1 text-xl font-black text-emerald-700"}>
                {client.debt > 0 ? currency.format(client.debt) : "Al dia"}
              </p>
            </div>

            {client.debt > 0 && (
              <button
                type="button"
                onClick={() => clearDebt(client.id)}
                className="cursor-pointer mt-4 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Marcar cobrado
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default FerreteriaClients;
