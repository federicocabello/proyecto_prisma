function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111F]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-6">
        <a href="#inicio" className="flex items-center gap-3">

          <img
            src="./icono_prisma.png"
            alt="Logo"
            className="logo-prisma-motion h-10 w-10"
          />

          <div>
            <h1 className="text-lg font-bold text-white md:text-2xl">
              Proyecto Prisma
            </h1>
            <p className="text-xs text-slate-400 md:text-sm">
              Soluciones para negocios
            </p>
          </div>
        </a>

        <div className="hidden gap-7 text-sm font-medium text-slate-300 md:flex">
          <a href="#inicio" className="hover:text-[#00D38E]">
            Inicio
          </a>

          <a href="#soluciones" className="hover:text-[#00D38E]">
            Soluciones
          </a>

          <a href="#demos" className="hover:text-[#00D38E]">
            Demos
          </a>

          <a href="#webs" className="hover:text-[#00D38E]">
            Webs
          </a>

          <a href="#planes" className="hover:text-[#00D38E]">
            Planes
          </a>

          <a href="#estrategia" className="hover:text-[#00D38E]">
            Estrategia
          </a>

          <a href="#contacto" className="hover:text-[#00D38E]">
            Contacto
          </a>
        </div>

        <a
          href="#planes"
          className="hidden rounded-full bg-[#00D38E] px-5 py-2.5 text-sm font-bold text-[#07111F] shadow-lg shadow-[#00D38E]/20 transition hover:scale-105 hover:bg-emerald-300 sm:inline-flex"
        >
          7 días gratis
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
