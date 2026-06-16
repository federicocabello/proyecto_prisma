const sales = [
  {
    customer: "Carlos Pérez",
    total: "$145.50",
    method: "Efectivo",
    status: "Pagado",
  },
  {
    customer: "María López",
    total: "$89.00",
    method: "Tarjeta",
    status: "Pagado",
  },
  {
    customer: "Obra San Martín",
    total: "$320.75",
    method: "Cuenta corriente",
    status: "Pendiente",
  },
];

function FerreteriaSales() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">
          Ventas recientes
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Seguimiento rápido de movimientos y pagos.
        </p>
      </div>

      <div className="space-y-4">
        {sales.map((sale) => (
          <div
            key={sale.customer}
            className="rounded-2xl border border-slate-200 p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div>
                <p className="font-bold text-slate-950">
                  {sale.customer}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {sale.method}
                </p>
              </div>

              <p className="font-black text-slate-950">
                {sale.total}
              </p>
            </div>

            <span
              className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                sale.status === "Pagado"
                  ? "bg-[#00D38E]/10 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {sale.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FerreteriaSales;
