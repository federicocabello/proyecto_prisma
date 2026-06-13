const plans = [
  {
    name: "Agente Automatizado",
    price: "$49.000",
    period: "/ mes",
    description:
      "Ideal para negocios que reciben muchas consultas y necesitan responder rápido sin perder oportunidades.",
    badge: "Atención automática",
    featured: false,
    features: [
      "Abonás y queda listo para usar",
      "Bot de respuestas para consultas frecuentes",
      "Atención inicial de clientes",
      "Captura de nombre, teléfono y necesidad",
      "Respuestas adaptadas al negocio",
      "Derivación a una persona cuando sea necesario",
      "Configuración inicial incluida",
      "Atención personalizada mensual",
    ],
  },
  {
    name: "Sistema Web",
    price: "$99.000",
    period: "/ mes",
    description:
      "Para negocios que necesitan organizar clientes, turnos, pagos, inventario o procesos internos.",
    badge: "Más solicitado",
    featured: true,
    features: [
      "Abonás y queda listo para usar",
      "Sistema web personalizado",
      "Panel administrativo privado",
      "Hosting, base de datos y acceso",
      "Diseño adaptado al negocio",
      "Soporte y mantenimiento básico",
      "Atención personalizada mensual",
      "Configuración inicial incluida",
    ],
  },
  {
    name: "Sistema + Agente Automatizado",
    price: "$139.000",
    period: "/ mes",
    description:
      "La opción más completa para administrar el negocio y automatizar la atención de consultas.",
    badge: "Completo",
    featured: false,
    features: [
      "Abonás y queda listo para usar",
      "Todo lo del Sistema Web",
      "Agente automatizado para consultas",
      "Bot para WhatsApp o canales digitales",
      "Captura de clientes interesados",
      "Integración entre consultas y sistema",
      "Soporte prioritario",
      "Atención personalizada mensual",
    ],
  },
  {
    name: "Prisma Pro",
    price: "A medida",
    period: "",
    description:
      "Para clientes que necesitan un sistema más grande, módulos especiales o integraciones avanzadas.",
    badge: "Avanzado",
    featured: false,
    features: [
      "Implementación lista para trabajar",
      "Sistema avanzado personalizado",
      "Módulos especiales según el negocio",
      "Reportes personalizados",
      "Automatizaciones avanzadas",
      "Integraciones externas",
      "Múltiples usuarios y permisos",
      "Atención personalizada mensual",
    ],
  },
];

function PricingSection() {
  return (
    <section id="planes" className="bg-[#07111F] px-5 py-20 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="font-bold text-[#00D38E]">
            Planes de desarrollo
          </p>

          <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">
            Elegí qué herramienta querés sumar a tu negocio.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Desarrollamos sistemas web, agentes automatizados o soluciones
            completas con configuración, soporte y mantenimiento incluidos.
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-[#00D38E]/30 bg-[#00D38E]/10 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#00D38E]">
                Prueba gratis
              </p>

              <h3 className="mt-2 text-2xl font-black text-white">
                Probá una versión funcional antes de contratar
              </h3>

              <p className="mt-2 max-w-3xl leading-7 text-slate-300">
                Vemos tu caso, preparamos una demo y te mostramos cómo podría
                funcionar en tu negocio.
              </p>
            </div>

            <a
              href="#contacto"
              className="rounded-2xl bg-[#00D38E] px-6 py-3 text-center font-black text-[#07111F] hover:bg-emerald-300"
            >
              Solicitar prueba
            </a>
          </div>
        </div>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-4">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex h-full flex-col rounded-3xl border p-6 transition hover:-translate-y-2 ${plan.featured
                  ? "border-[#00D38E] bg-white text-slate-950 shadow-2xl shadow-[#00D38E]/10"
                  : "border-white/10 bg-white/5 text-white hover:border-[#00D38E]/40"
                }`}
            >
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${plan.featured
                    ? "bg-[#00D38E] text-[#07111F]"
                    : "bg-[#00D38E]/10 text-[#00D38E]"
                  }`}
              >
                {plan.badge}
              </span>

              <h3 className="mt-5 text-2xl font-black">
                {plan.name}
              </h3>

              <p
                className={`mt-3 min-h-18 text-sm leading-6 ${plan.featured ? "text-slate-600" : "text-slate-400"
                  }`}
              >
                {plan.description}
              </p>

              <div className="mt-6 flex items-end gap-1">
                <p className="text-4xl font-black">
                  {plan.price}
                </p>

                <p
                  className={`pb-1 text-sm font-semibold ${plan.featured ? "text-slate-500" : "text-slate-400"
                    }`}
                >
                  {plan.period}
                </p>
              </div>

              <div
                className={`mt-6 h-px ${plan.featured ? "bg-slate-200" : "bg-white/10"
                  }`}
              />

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-6">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00D38E] text-xs font-black text-[#07111F]">
                      ✓
                    </span>

                    <span
                      className={plan.featured ? "text-slate-700" : "text-slate-300"}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-7">
                <a
                  href="#contacto"
                  className={`block rounded-2xl px-5 py-3 text-center text-sm font-black transition ${plan.featured
                      ? "bg-slate-950 text-white hover:bg-[#00D38E] hover:text-[#07111F]"
                      : "bg-[#00D38E] text-[#07111F] hover:bg-emerald-300"
                    }`}
                >
                  Consultar este plan
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="max-w-3xl">
            <p className="font-bold text-[#00D38E]">
              Adicionales disponibles
            </p>

            <h3 className="mt-3 text-2xl font-black text-white md:text-3xl">
              Funciones extra para sistemas más completos.
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Algunos negocios necesitan funciones especiales según su público, zona o
              forma de trabajo. Estos adicionales se cotizan según el alcance del
              proyecto.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-[#07111F] p-5">
              <p className="text-2xl">🌎</p>
              <h4 className="mt-3 font-black text-white">
                Sistema multiidioma
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Ideal para negocios que atienden clientes en español, inglés u otros
                idiomas.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#07111F] p-5">
              <p className="text-2xl">🌗</p>
              <h4 className="mt-3 font-black text-white">
                Tema claro / oscuro
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Permite que el usuario cambie la apariencia del sistema según su
                preferencia.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#07111F] p-5">
              <p className="text-2xl">⚙️</p>
              <h4 className="mt-3 font-black text-white">
                Módulos personalizados
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Lector de códigos de barra, generación de facturas, PDFs,
                reportes, integraciones o funciones propias del negocio.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default PricingSection;
