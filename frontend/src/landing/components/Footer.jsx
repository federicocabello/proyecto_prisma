import "flag-icons/css/flag-icons.min.css";

function Footer() {

  return (
    <footer
      id="contacto"
      className="relative overflow-hidden border-t border-white/10 bg-[#050B14] px-5 py-16 md:px-6"
    >
      <div className="footer-scan-line absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00D38E] to-transparent" />
      <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(135deg,rgba(0,211,142,0.08),transparent_35%,rgba(6,182,212,0.06))]" />
      <div className="absolute -right-20 top-16 h-80 w-80 rounded-full border border-[#00D38E]/10" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#00D38E]/30 bg-[#00D38E]/10 px-4 py-2 shadow-lg shadow-[#00D38E]/10">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#00D38E]" />
            <span className="text-sm font-bold text-[#00D38E]">
              Creador de Proyecto Prisma
            </span>
          </div>

          <h3 className="text-3xl font-black text-white md:text-5xl">
            Soy Federico, hablemos de tu proyecto!
          </h3>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Puedo ayudarte a mejorar tu negocio con herramientas digitales y estrategias de marketing respaldada por mi experiencia en el mercado, estudios y trabajo con clientes internacionales.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="footer-credential-card rounded-2xl border border-[#00D38E]/20 bg-[#00D38E]/10 p-4">
              <div className="flex items-center gap-3">
                <span className="footer-credential-icon flex h-15 w-25 items-center justify-center rounded-xl bg-[#00D38E] text-xl">
                  🎓
                </span>
                <div>
                  <p className="font-black text-white">
                    Formación académica
                  </p>
                  <p className="text-sm text-slate-400">
                    Título universitario en análisis y programación de sistemas.
                  </p>
                </div>
              </div>
            </div>

            <div className="footer-credential-card rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <span className="footer-credential-icon flex h-15 w-25 items-center justify-center rounded-xl bg-white/10 text-xl">
                  <span className="fi fi-us"></span>
                </span>
                <div>
                  <p className="font-black text-white">
                    +3 años con empresas de EE.UU.
                  </p>
                  <p className="text-sm text-slate-400">
                    Actualmente trabajo en sistemas de compañias internacionales.
                  </p>
                </div>
              </div>
            </div>

            <div className="footer-credential-card rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <span className="footer-credential-icon flex h-15 w-25 items-center justify-center rounded-xl bg-white/10 text-xl">
                  <span className="fi fi-ar"></span>
                </span>
                <div>
                  <p className="font-black text-white">
                    +3 años freelance
                  </p>
                  <p className="text-sm text-slate-400">
                    Diversidad de proyectos con distintas empresas de sudamérica.
                  </p>
                </div>
              </div>
            </div>

            <div className="footer-credential-card rounded-2xl border border-[#00D38E]/20 bg-[#00D38E]/10 p-4">
              <div className="flex items-center gap-3">
                <span className="footer-credential-icon flex h-15 w-25 items-center justify-center rounded-xl bg-[#00D38E] text-xl">
                  🗣️
                </span>
                <div>
                  <p className="font-black text-white">
                    Inglés B2 certificado
                  </p>
                  <p className="text-sm text-slate-400">
                    Diploma de instituto para una comunicación profesional bilingüe.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="footer-contact-card rounded-[2rem] border border-[#00D38E]/20 bg-white/5 p-5 shadow-2xl shadow-[#00D38E]/10 backdrop-blur">
          <div className="rounded-[1.5rem] bg-[#0B1628] p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-[#00D38E]/30 bg-[#07111F] shadow-lg shadow-[#00D38E]/20">
                <span className="text-center text-xs font-bold leading-4 text-slate-500">
                  Foto
                </span>
              </div>

              <div>
                <p className="text-sm font-bold text-[#00D38E]">
                  Ingeniero de software
                </p>
                <p className="text-sm text-slate-400">
                  Desarrollo · Automatización • Marketing
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

          </div>

          <div className="mt-6 rounded-3xl bg-[#00D38E] p-5 text-[#07111F]">
            <p className="font-black">
              ¿Querés hacer crecer tu negocio?
            </p>

            <p className="mt-2 text-sm font-medium leading-6">
              Veamos cómo potenciar tus ganancias.
            </p>

            <a
              href="https://wa.me/5492604659499"
              target="_blank"
              rel="noreferrer"
              className="footer-meeting-button mt-4 inline-flex items-center gap-4 rounded-2xl bg-[#07111F] px-5 py-3 text-sm font-black text-white transition hover:scale-105"
            >
              <span className="footer-meeting-hand scale-150" aria-hidden="true">👉</span>
              Agendemos una reunión
            </a>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-center">
        <p>
          © {new Date().getFullYear()} Proyecto Prisma. Soluciones para negocios.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
