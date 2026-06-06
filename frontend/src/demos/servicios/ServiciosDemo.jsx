import { Link } from "react-router-dom";

import ServiciosHeader from "./components/ServiciosHeader";
import ServiciosStats from "./components/ServiciosStats";
import OrdenesTrabajo from "./components/OrdenesTrabajo";
import TecnicosList from "./components/TecnicosList";
import ServiciosAgenda from "./components/ServiciosAgenda";

function ServiciosDemo() {
  return (
    <main className="min-h-screen bg-slate-100">
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-slate-200 bg-[#07111F] p-6 text-white lg:block">
        <Link to="/" className="block">
          <h1 className="text-2xl font-black">Proyecto Prisma</h1>
          <p className="mt-1 text-sm text-slate-400">
            Demo Servicios Técnicos
          </p>
        </Link>

        <nav className="mt-10 space-y-2">
          {[
            "Dashboard",
            "Órdenes",
            "Técnicos",
            "Agenda",
            "Presupuestos",
            "Pagos",
          ].map((item) => (
            <a
              key={item}
              href="#"
              className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-[#00D38E]"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/10 p-4">
          <p className="text-sm font-bold text-[#00D38E]">
            Demo activa
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            Ideal para técnicos, instaladores, reparadores y empresas con
            visitas a domicilio.
          </p>
        </div>
      </aside>

      <section className="lg:ml-72">
        <div className="mx-auto max-w-7xl px-5 py-6 md:px-8">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <div>
              <h1 className="text-xl font-black text-slate-950">
                Servicios Técnicos
              </h1>
              <p className="text-sm text-slate-500">Proyecto Prisma</p>
            </div>

            <Link
              to="/"
              className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white"
            >
              Volver
            </Link>
          </div>

          <ServiciosHeader />
          <ServiciosStats />

          <div className="mt-8 grid gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <OrdenesTrabajo />
            </div>

            <div className="space-y-6">
              <TecnicosList />
              <ServiciosAgenda />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ServiciosDemo;