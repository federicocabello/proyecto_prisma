const websiteFeatures = [
  "Página informativa para tu negocio",
  "Dominio o subdominio incluido",
  "Hosting y configuración inicial",
  "Diseño adaptado a tu negocio",
  "Secciones para servicios, horarios y ubicación",
  "Alta del negocio en Google",
  "Formulario de contacto simple",
  "Botón directo a WhatsApp o redes",
  "Mantenimiento mensual incluido",
  "Lista para usar sin vueltas",
];

function WebsiteSection() {
  return (
    <section id="webs" className="bg-white px-5 py-20 text-slate-900 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-bold text-[#00D38E]">
            Página web para tu negocio
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            Mostrá lo que ofrecés con una página clara y profesional.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Ideal para presentar tus servicios, generar confianza y recibir
            consultas desde una página clara, rápida y preparada para verse
            bien en el celular.
          </p>
        </div>

        <article className="mx-auto mt-12 grid max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-xl lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-[#07111F] p-7 text-white md:p-9">
            <span className="inline-flex rounded-full bg-[#00D38E]/10 px-3 py-1 text-xs font-black text-[#00D38E]">
              Plan mensual
            </span>

            <h3 className="mt-5 text-3xl font-black">
              Página completa lista para usar
            </h3>

            <p className="mt-4 leading-7 text-slate-300">
              Abonás y dejamos tu web funcionando con dominio, mantenimiento y
              todo lo necesario para empezar a recibir consultas.
            </p>

            <div className="mt-7 flex items-end gap-2">
              <p className="text-5xl font-black">
                $89.000
              </p>
              <p className="pb-2 text-sm font-semibold text-slate-400">
                / mes
              </p>
            </div>

            <a
              href="#contacto"
              className="mt-8 block rounded-2xl bg-[#00D38E] px-5 py-4 text-center text-sm font-black text-[#07111F] transition hover:bg-emerald-300"
            >
              Quiero mi página
            </a>
          </div>

          <div className="p-7 md:p-9">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#00D38E]">
              Incluye
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {websiteFeatures.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00D38E] text-xs font-black text-[#07111F]">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
              <p className="font-black text-slate-950">
                Pensada para clientes desde el celular.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Textos claros, carga rápida y botones visibles para que la
                persona sepa qué ofrecés y cómo contactarte.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default WebsiteSection;
