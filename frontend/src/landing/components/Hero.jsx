function Hero({ backendMessage }) {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-[#07111F] px-5 py-20 md:px-6 md:py-28"
    >
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-[#00D38E]/20 blur-3xl" />
      <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="animate-fade-up">
          <span className="inline-flex rounded-full border border-[#00D38E]/30 bg-[#00D38E]/10 px-4 py-2 text-sm font-semibold text-[#00D38E]">
            Desarrollo · Automatización · Estrategias
          </span>

          <h2 className="relative mt-7 max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="relative inline-flex pr-14 sm:pr-20">
              Potenciá
              <span className="rocket-profit" aria-hidden="true">
                <span className="rocket-profit__trail" />
                <span className="rocket-profit__icon">🚀</span>
              </span>
            </span>{" "}
            tus <span className="text-[#00D38E]">ganancias</span> con herramientas simples
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            <strong className="text-[#00D38E]">Prisma</strong> crea sistemas, webs y automatizaciones para ordenar tu negocio, vender mejor y tomar decisiones con datos claros.
          </p>

          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <a
              href="#demos"
              className="rounded-2xl bg-[#00D38E] px-7 py-4 text-center font-bold text-[#07111F] shadow-xl shadow-[#00D38E]/20 transition hover:scale-105 hover:bg-emerald-300"
            >
              Explorar demos
            </a>

            <a
              href="#contacto"
              className="rounded-2xl border border-white/15 px-7 py-4 text-center font-bold text-white transition hover:border-[#00D38E]/60 hover:bg-white/5"
            >
              Quiero mi sistema
            </a>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <span className="font-bold text-white">Estado backend:</span>{" "}
            <span className="text-[#00D38E]">
              {backendMessage || "Verificando conexión..."}
            </span>
          </div>
        </div>

        <div className="animate-float-soft">
          <div className="animate-pulse-glow rounded-4xl border border-[#00D38E]/20 bg-white/10 p-4 shadow-2xl backdrop-blur">
            <div className="rounded-3xl bg-[#0B1628] p-5">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">
                    Vista previa
                  </p>
                  <h3 className="text-2xl font-black text-white">
                    Panel inteligente
                  </h3>
                </div>

                <span className="rounded-full bg-[#00D38E]/10 px-3 py-1 text-xs font-bold text-[#00D38E]">
                  Online
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Clientes</p>
                  <p className="mt-2 text-3xl font-black text-white">128</p>
                  <p className="mt-1 text-xs text-[#00D38E]">+12 este mes</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Citas</p>
                  <p className="mt-2 text-3xl font-black text-white">24</p>
                  <p className="mt-1 text-xs text-[#00D38E]">Agenda activa</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Ventas</p>
                  <p className="mt-2 text-3xl font-black text-white">$3.2k</p>
                  <p className="mt-1 text-xs text-[#00D38E]">Control diario</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="mb-4 text-sm font-bold text-white">
                  Herramientas que podemos desarrollar
                </p>

                <div className="grid gap-2 sm:grid-cols-2">
                  {[
                    "Sistemas para gestionar tu negocio",
                    "Páginas web profesionales",
                    "Agentes IA para responder consultas",
                    "Control de clientes, empleados y tareas",
                    "Reportes, análisis y métricas",
                    "Inventario y facturación automática",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl bg-[#07111F] px-3 py-2 text-sm text-slate-300"
                    >
                      <span className="mr-2 text-[#00D38E]">●</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-[#00D38E] p-4 text-[#07111F]">
                <p className="text-sm font-bold">
                  Objetivo:
                </p>
                <p className="mt-1 text-sm font-medium">
                  Más control y mayores ganancias, todo con herramientas modernas y ajustadas a tu negocio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
