const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const statusStyles = {
  Pendiente: "bg-amber-100 text-amber-700",
  Preparando: "bg-sky-100 text-sky-700",
  Entregado: "bg-[#00D38E]/10 text-emerald-700",
};

function FerreteriaOrders({ orders, setOrders }) {
  const updateStatus = (orderId, status) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Pedidos</h3>
        <p className="mt-1 text-sm text-slate-500">
          Seguimiento de encargues y presupuestos que pasan a preparacion.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {orders.map((order) => (
          <article key={order.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-black text-slate-400">{order.id}</p>
                <p className="mt-1 break-words font-black text-slate-950">{order.customer}</p>
                <p className="mt-1 break-words text-sm text-slate-500">{order.detail}</p>
              </div>
              <p className="shrink-0 text-xl font-black text-slate-950 sm:text-right">
                {currency.format(order.total)}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${statusStyles[order.status]}`}>
                {order.status}
              </span>

              <select
                value={order.status}
                onChange={(event) => updateStatus(order.id, event.target.value)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold outline-none focus:border-[#00D38E]"
              >
                <option>Pendiente</option>
                <option>Preparando</option>
                <option>Entregado</option>
              </select>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FerreteriaOrders;
