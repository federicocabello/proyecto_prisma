const payments = [
  {
    tenant: "Ana Martínez",
    unit: "Apt. 101",
    rent: "$700",
    dueDate: "Día 1",
    status: "Pagado",
    method: "Transferencia",
  },
  {
    tenant: "Carlos Gómez",
    unit: "Apt. 104",
    rent: "$750",
    dueDate: "Día 5",
    status: "Pendiente",
    method: "Promesa de pago",
  },
  {
    tenant: "María López",
    unit: "Apt. 202",
    rent: "$700",
    dueDate: "Día 1",
    status: "Vencido",
    method: "Sin confirmar",
  },
  {
    tenant: "Luis Fernández",
    unit: "Apt. 205",
    rent: "$800",
    dueDate: "Día 10",
    status: "Pagado",
    method: "Efectivo",
  },
  {
    tenant: "Sofía Ruiz",
    unit: "Apt. 302",
    rent: "$700",
    dueDate: "Día 8",
    status: "Pendiente",
    method: "Zelle",
  },
];

function CobrosMensuales() {
  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-black text-slate-950">
            Cobros mensuales
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Control de rentas del mes, pagos vencidos y promesas de pago.
          </p>
        </div>

        <button className="w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] md:w-auto">
          Registrar pago
        </button>
      </div>

      <div className="grid gap-3 md:hidden">
        {payments.map((payment) => (
          <article
            key={`${payment.tenant}-${payment.unit}`}
            className="rounded-2xl border border-slate-200 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-black text-slate-950">{payment.tenant}</p>
                <p className="mt-1 text-sm text-slate-500">{payment.unit}</p>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                  payment.status === "Pagado"
                    ? "bg-[#00D38E]/10 text-emerald-700"
                    : payment.status === "Pendiente"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {payment.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Renta</p>
                <p className="font-black text-slate-950">{payment.rent}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Vence</p>
                <p className="font-black text-slate-950">{payment.dueDate}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Método</p>
                <p className="font-black text-slate-950">{payment.method}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-4 font-bold">Inquilino</th>
                <th className="px-5 py-4 font-bold">Unidad</th>
                <th className="px-5 py-4 font-bold">Renta</th>
                <th className="px-5 py-4 font-bold">Vence</th>
                <th className="px-5 py-4 font-bold">Método</th>
                <th className="px-5 py-4 font-bold">Estado</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {payments.map((payment) => (
                <tr
                  key={`${payment.tenant}-${payment.unit}`}
                  className="hover:bg-slate-50"
                >
                  <td className="px-5 py-4 font-black text-slate-950">
                    {payment.tenant}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {payment.unit}
                  </td>

                  <td className="px-5 py-4 font-bold text-slate-950">
                    {payment.rent}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {payment.dueDate}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {payment.method}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        payment.status === "Pagado"
                          ? "bg-[#00D38E]/10 text-emerald-700"
                          : payment.status === "Pendiente"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {payment.status}
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

export default CobrosMensuales;
