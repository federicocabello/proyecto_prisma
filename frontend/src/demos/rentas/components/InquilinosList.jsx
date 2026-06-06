const tenants = [
  {
    name: "Ana Martínez",
    unit: "Apt. 101",
    phone: "956 410 3322",
    contract: "Activo",
  },
  {
    name: "Carlos Gómez",
    unit: "Apt. 104",
    phone: "956 555 1122",
    contract: "Renovar pronto",
  },
  {
    name: "Sofía Ruiz",
    unit: "Apt. 302",
    phone: "956 872 9901",
    contract: "Activo",
  },
];

function InquilinosList() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">
          Inquilinos
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Contactos, contratos y unidades asignadas.
        </p>
      </div>

      <div className="space-y-4">
        {tenants.map((tenant) => (
          <div
            key={tenant.name}
            className="rounded-2xl border border-slate-200 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-black text-slate-950">
                  {tenant.name}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {tenant.unit} · {tenant.phone}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  tenant.contract === "Activo"
                    ? "bg-[#00D38E]/10 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {tenant.contract}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F]">
        Nuevo inquilino
      </button>
    </section>
  );
}

export default InquilinosList;