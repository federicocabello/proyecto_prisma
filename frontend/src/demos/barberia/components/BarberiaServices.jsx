const services = [
  {
    name: "Corte clásico",
    duration: "30 min",
    price: "$25",
  },
  {
    name: "Corte + barba",
    duration: "45 min",
    price: "$40",
  },
  {
    name: "Fade",
    duration: "40 min",
    price: "$35",
  },
  {
    name: "Diseño de barba",
    duration: "25 min",
    price: "$18",
  },
];

function BarberiaServices() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">
          Servicios
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Lista de servicios disponibles para agendar.
        </p>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.name}
            className="rounded-2xl border border-slate-200 p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div>
                <p className="font-black text-slate-950">
                  {service.name}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Duración: {service.duration}
                </p>
              </div>

              <p className="font-black text-[#00D38E]">
                {service.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F]">
        Nuevo servicio
      </button>
    </section>
  );
}

export default BarberiaServices;
