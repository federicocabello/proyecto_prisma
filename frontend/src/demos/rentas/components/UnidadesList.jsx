const units = [
  {
    unit: "Apt. 101",
    type: "Studio",
    tenant: "Ana Martínez",
    rent: "$700",
    status: "Ocupado",
  },
  {
    unit: "Apt. 104",
    type: "1 recámara",
    tenant: "Carlos Gómez",
    rent: "$750",
    status: "Ocupado",
  },
  {
    unit: "Apt. 207",
    type: "Studio",
    tenant: "Disponible",
    rent: "$700",
    status: "Disponible",
  },
  {
    unit: "Apt. 302",
    type: "Studio",
    tenant: "Sofía Ruiz",
    rent: "$700",
    status: "Ocupado",
  },
];

function UnidadesList() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-black text-slate-950">
            Unidades
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Vista rápida de unidades disponibles, ocupadas y renta mensual.
          </p>
        </div>

        <button className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F]">
          Nueva unidad
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {units.map((unit) => (
          <article
            key={unit.unit}
            className="rounded-2xl border border-slate-200 p-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div>
                <h4 className="font-black text-slate-950">
                  {unit.unit}
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  {unit.type}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  unit.status === "Disponible"
                    ? "bg-[#00D38E]/10 text-emerald-700"
                    : "bg-sky-100 text-sky-700"
                }`}
              >
                {unit.status}
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs font-bold text-slate-500">
                  Inquilino
                </p>
                <p className="mt-1 font-black text-slate-950">
                  {unit.tenant}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs font-bold text-slate-500">
                  Renta mensual
                </p>
                <p className="mt-1 font-black text-slate-950">
                  {unit.rent}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default UnidadesList;
