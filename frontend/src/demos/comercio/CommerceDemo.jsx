import { Link, useParams } from "react-router-dom";

import { commerceDemos } from "./data/commerceDemos";

import CommerceHeader from "./components/CommerceHeader";
import CommerceStats from "./components/CommerceStats";
import CommerceProducts from "./components/CommerceProducts";
import CommerceSales from "./components/CommerceSales";

function CommerceDemo() {
  const { type } = useParams();

  const demo = commerceDemos[type] || commerceDemos.ferreteria;

  return (
    <main className="min-h-screen bg-slate-100">
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-slate-200 bg-[#07111F] p-6 text-white lg:block">
        <Link to="/" className="block">
          <h1 className="text-2xl font-black">Proyecto Prisma</h1>
          <p className="mt-1 text-sm text-slate-400">
            {demo.sidebarLabel}
          </p>
        </Link>

        <nav className="mt-10 space-y-2">
          {["Dashboard", "Productos", "Ventas", "Proveedores", "Reportes"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-[#00D38E]"
              >
                {item}
              </a>
            )
          )}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/10 p-4">
          <p className="text-sm font-bold text-[#00D38E]">
            {demo.activeModule}
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            Esta pantalla muestra cómo puede adaptarse un mismo sistema base a
            un rubro específico.
          </p>
        </div>
      </aside>

      <section className="lg:ml-72">
        <div className="mx-auto max-w-7xl px-5 py-6 md:px-8">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <div>
              <h1 className="text-xl font-black text-slate-950">
                {demo.title}
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

          <CommerceHeader demo={demo} />
          <CommerceStats stats={demo.stats} />

          {demo.specialFeature && (
            <section className="mt-8 rounded-3xl border border-[#00D38E]/30 bg-[#07111F] p-6 text-white shadow-sm">
              <div className="grid gap-6 lg:grid-cols-3 lg:items-center">
                <div className="lg:col-span-2">
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-[#00D38E]">
                    Función destacada
                  </p>

                  <h3 className="mt-3 text-2xl font-black md:text-3xl">
                    {demo.specialFeature.title}
                  </h3>

                  <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                    {demo.specialFeature.description}
                  </p>
                </div>

                <div className="rounded-3xl bg-white/10 p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00D38E] text-2xl">
                      ▌▌▌
                    </div>

                    <div>
                      <p className="text-sm text-slate-400">
                        Modo venta rápida
                      </p>
                      <p className="font-black text-white">
                        Código de barra
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {demo.specialFeature.items.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl bg-[#07111F] px-4 py-3 text-sm text-slate-300"
                      >
                        <span className="mr-2 text-[#00D38E]">✓</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          <div className="mt-8 grid gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <CommerceProducts products={demo.products} />
            </div>

            <div>
              <CommerceSales sales={demo.sales} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CommerceDemo;