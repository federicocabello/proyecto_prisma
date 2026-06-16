const consultingItems = [
  {
    icon: "🔎",
    title: "Análisis del negocio",
    description:
      "Miramos cómo mostrás tus servicios, cómo atendés consultas y qué puede estar frenando más ventas.",
  },
  {
    icon: "💬",
    title: "Mensajes más claros",
    description:
      "Ordenamos textos, respuestas y formas de explicar lo que ofrecés para que el cliente entienda rápido.",
  },
  {
    icon: "📈",
    title: "Mejoras para vender más",
    description:
      "Te dejamos consejos y cambios concretos para mejorar consultas, reservas, pedidos o ventas.",
  },
  {
    icon: "📊",
    title: "Métricas y reportes",
    description:
      "Definimos qué datos conviene mirar para controlar mejor resultados, campañas, consultas y crecimiento.",
  },
];

function GrowthConsultingSection() {
  return (
    <section id="estrategia" className="bg-[#07111F] px-5 py-20 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-bold text-[#00D38E]">
            Análisis comercial y marketing
          </p>

          <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">
            Te ofrecemos estrategias para ganar clientes y crecer.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Estudiamos cómo vendés, cómo respondés y cómo se presenta tu negocio.
            Después dejamos acciones simples para mejorar tu página, sistema,
            atención, marketing y comunicación.
          </p>

          <div className="mt-8 rounded-3xl border border-[#00D38E]/30 bg-[#00D38E]/10 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="consulting-gift-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#00D38E] text-2xl">
                🎁
              </div>

              <div>
                <span className="inline-flex rounded-full bg-[#00D38E] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#07111F]">
                  De regalo con cualquier plan
                </span>

                <p className="mt-4 text-xl font-black text-white">
                  Incluye una mirada comercial para detectar mejoras reales.
                </p>

                <p className="mt-2 leading-7 text-slate-300">
                  Ideal para<b> Prisma Pro</b>: donde sumamos
                  marketing, métricas y reportes para saber qué cambiar, qué
                  medir y cómo tener más control del negocio.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {consultingItems.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[#00D38E]/40"
            >
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#00D38E]/10 text-3xl">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-xl font-black text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 leading-7 text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}

          <a
            href="#contacto"
            className="block rounded-2xl bg-[#00D38E] px-6 py-4 text-center font-black text-[#07111F] hover:bg-emerald-300"
          >
            Quiero una evaluación
          </a>
        </div>
      </div>
    </section>
  );
}

export default GrowthConsultingSection;
