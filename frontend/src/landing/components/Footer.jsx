function Footer() {
  return (
    <footer
      id="contacto"
      className="relative overflow-hidden border-t border-white/10 bg-[#07111F] px-5 py-16 md:px-6"
    >
      <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-[#00D38E]/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#00D38E]/30 bg-[#00D38E]/10 px-4 py-2">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#00D38E]" />
            <span className="text-sm font-bold text-[#00D38E]">
              Creador de Proyecto Prisma
            </span>
          </div>

          <h3 className="text-3xl font-black text-white md:text-5xl">
            Soy Federico, creador de Proyecto Prisma.
          </h3>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Desarrollo soluciones digitales para negocios que necesitan trabajar
            con más orden, controlar mejor su información y presentarse de forma
            más profesional ante sus clientes.
          </p>

          <p className="mt-4 max-w-3xl leading-8 text-slate-400">
            Además de crear sistemas y páginas web, ayudo a detectar fallas en
            la forma de vender, responder consultas y mostrar los servicios. Mi
            objetivo es que cada negocio tenga herramientas simples, útiles y
            listas para usar.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-[#00D38E]/40">
              <div className="text-3xl">💻</div>
              <p className="mt-3 font-black text-white">
                Desarrollo web
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Sistemas, paneles, páginas y herramientas digitales.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-[#00D38E]/40">
              <div className="text-3xl">📈</div>
              <p className="mt-3 font-black text-white">
                Visión comercial
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Mejora de mensajes, procesos de venta y captación.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-[#00D38E]/40">
              <div className="text-3xl">⚙️</div>
              <p className="mt-3 font-black text-white">
                Automatización
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Procesos, respuestas y herramientas para ahorrar tiempo.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
          <div className="rounded-[1.5rem] bg-[#0B1628] p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#00D38E] text-3xl font-black text-[#07111F] shadow-lg shadow-[#00D38E]/20">
                F
              </div>

              <div>
                <p className="text-sm font-bold text-[#00D38E]">
                  Proyecto Prisma
                </p>
                <h4 className="text-2xl font-black text-white">
                  Federico
                </h4>
                <p className="text-sm text-slate-400">
                  Desarrollo · estrategia · soluciones para negocios
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <a
                href="mailto:contacto@proyectoprisma.com"
                className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-[#00D38E] hover:text-[#07111F]"
              >
                <span>📧 Email</span>
                <span>contacto@proyectoprisma.com</span>
              </a>

              <a
                href="#planes"
                className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-[#00D38E] hover:text-[#07111F]"
              >
                <span>💼 Planes</span>
                <span>Ver opciones</span>
              </a>

              <a
                href="#demos"
                className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-[#00D38E] hover:text-[#07111F]"
              >
                <span>🚀 Demos</span>
                <span>Explorar</span>
              </a>
            </div>

            <div className="mt-6 rounded-3xl bg-[#00D38E] p-5 text-[#07111F]">
              <p className="font-black">
                ¿Tenés una idea para tu negocio?
              </p>

              <p className="mt-2 text-sm font-medium leading-6">
                Podemos transformarla en una página, sistema, asistente
                automatizado o herramienta digital lista para usar.
              </p>

              <a
                href="mailto:contacto@proyectoprisma.com"
                className="mt-5 inline-flex rounded-2xl bg-[#07111F] px-5 py-3 text-sm font-black text-white transition hover:scale-105"
              >
                Hablemos del proyecto
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} Proyecto Prisma. Soluciones para negocios.
        </p>

        <p>
          Diseñado y desarrollado por Federico.
        </p>
      </div>
    </footer>
  );
}

export default Footer;