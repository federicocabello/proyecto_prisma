const websitePlans = [
  {
    name: "Página Informativa",
    price: "$149.000",
    description:
      "Ideal para negocios que necesitan presencia online profesional sin sistema administrativo.",
    features: [
      "Página de inicio profesional",
      "Sección de servicios",
      "Galería de imágenes",
      "Botón de WhatsApp",
      "Formulario de contacto",
      "Ubicación y horarios",
      "Diseño responsive",
      "Hosting básico incluido",
    ],
  },
  {
    name: "Página Web Premium",
    price: "$249.000",
    description:
      "Para negocios que quieren una web más completa, moderna y preparada para captar clientes.",
    featured: true,
    features: [
      "Todo lo de la página informativa",
      "Más secciones personalizadas",
      "Diseño visual más avanzado",
      "Optimización básica para buscadores",
      "Integración con redes sociales",
      "Formulario avanzado",
      "Dominio o subdominio",
      "Preparada para futuras campañas",
    ],
  },
];

function WebsiteSection() {
  return (
    <section id="webs" className="bg-white px-5 py-20 text-slate-900 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="font-bold text-[#00D38E]">
            Páginas web informativas
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            También creamos páginas web para negocios que quieren promocionarse mejor.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            No todos los negocios necesitan un sistema completo desde el primer
            día. Algunos necesitan una web clara, moderna y profesional para
            mostrar sus servicios, generar confianza y recibir consultas.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {websitePlans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-3xl border p-7 shadow-sm transition hover:-translate-y-2 hover:shadow-xl ${
                plan.featured
                  ? "border-[#00D38E] bg-[#07111F] text-white"
                  : "border-slate-200 bg-slate-50 text-slate-950"
              }`}
            >
              <h3 className="text-2xl font-black">
                {plan.name}
              </h3>

              <p
                className={`mt-3 leading-7 ${
                  plan.featured ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {plan.description}
              </p>

              <div className="mt-6 flex items-end gap-2">
                <p className="text-4xl font-black">
                  {plan.price}
                </p>
                <p
                  className={`pb-1 text-sm font-semibold ${
                    plan.featured ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  pago inicial
                </p>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-6">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00D38E] text-xs font-black text-[#07111F]">
                      ✓
                    </span>
                    <span className={plan.featured ? "text-slate-300" : "text-slate-700"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                className={`mt-7 block rounded-2xl px-5 py-3 text-center text-sm font-black transition ${
                  plan.featured
                    ? "bg-[#00D38E] text-[#07111F] hover:bg-emerald-300"
                    : "bg-slate-950 text-white hover:bg-[#00D38E] hover:text-[#07111F]"
                }`}
              >
                Consultar página web
              </a>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="font-black text-slate-950">
            Importante:
          </p>
          <p className="mt-2 leading-7 text-slate-600">
            Las páginas informativas pueden crecer luego hacia un sistema web
            completo, agregando usuarios, panel administrativo, formularios,
            automatizaciones o módulos personalizados.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WebsiteSection;