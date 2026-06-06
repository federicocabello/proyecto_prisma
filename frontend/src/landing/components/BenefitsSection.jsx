const benefits = [
  {
    title: "Organizá tu negocio",
    description:
      "Centralizá clientes, pagos, citas, productos, tareas y reportes en un sistema web simple de usar.",
  },
  {
    title: "Evitá pérdidas",
    description:
      "Controlá información importante como deudas, stock, trabajos pendientes, ventas y movimientos del negocio.",
  },
  {
    title: "Automatizá procesos",
    description:
      "Creamos herramientas con inteligencia artificial, bots de respuesta y flujos automáticos para ahorrar tiempo.",
  },
];

function BenefitsSection() {
  return (
    <section id="soluciones" className="bg-[#07111F] px-5 pb-20 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="font-bold text-[#00D38E]">
            Qué hacemos
          </p>

          <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">
            Creamos soluciones digitales que ayudan a negocios reales a trabajar mejor.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            No se trata solo de tener una página web. Se trata de tener una
            herramienta que ayude a administrar, vender, atender clientes y tomar
            mejores decisiones.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:border-[#00D38E]/40 hover:bg-white/[0.07]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00D38E] font-black text-[#07111F]">
                ✓
              </div>

              <h3 className="text-xl font-black text-white">
                {benefit.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;