import { useState } from "react";
import { Link } from "react-router-dom";

const demos = [
  {
    icon: "🧰",
    title: "Sistema para Ferretería",
    description:
      "Buscá productos, vendé rápido, controlá stock, presupuestos, proveedores y caja.",
    tag: "Inventario y ventas",
    path: "/demo/ferreteria",
    active: true,
  },
  {
    icon: "🎨",
    title: "Sistema para Pinturería",
    description:
      "Organizá pinturas, colores, mezclas, presupuestos, ventas y productos faltantes.",
    tag: "Comercio especializado",
    path: "/demo/pintureria",
    active: true,
  },
  {
    icon: "🏪",
    title: "Sistema para Kiosco",
    description:
      "Venta rápida, lector de código, control de caja, stock, fiados y proveedores.",
    tag: "Caja y código de barra",
    path: "/demo/kiosco",
    active: true,
  },
  {
    icon: "💈",
    title: "Sistema para Barbería",
    description:
      "Agendá turnos, cargá clientes, servicios, barberos e ingresos del día.",
    tag: "Turnos y servicios",
    path: "/demo/barberia",
    active: true,
  },
  {
    icon: "🏥",
    title: "Sistema para Clínica",
    description:
      "Agenda médica, pacientes, citas, documentos pendientes, pagos y seguimiento.",
    tag: "Pacientes y atención",
    path: "/demo/clinica",
    active: true,
  },
  {
    icon: "🏘️",
    title: "Sistema para Rentas",
    description:
      "Controlá propiedades, inquilinos, cobros mensuales, contratos y mantenimientos.",
    tag: "Alquileres y propiedades",
    path: "/demo/rentas",
    active: true,
  },
  {
    icon: "🛠️",
    title: "Sistema para Servicios Técnicos",
    description:
      "Estamos preparando una nueva demo para este rubro.",
    tag: "Próximamente",
    path: "#",
    active: false,
  },
  {
    icon: "🍽️",
    title: "Sistema para Restaurante",
    description:
      "Estamos preparando una nueva demo para este rubro.",
    tag: "Próximamente",
    path: "#",
    active: false,
  },
];

function DemoSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const total = demos.length;

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const getPosition = (index) => {
    const diff = (index - activeIndex + total) % total;

    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === total - 1) return "left";

    return "hidden";
  };

  return (
    <section
      id="demos"
      className="overflow-hidden bg-slate-50 px-5 py-24 text-slate-900 md:px-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-bold text-[#00D38E]">Demos por rubro</p>

          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            Mirá cómo podría funcionar tu negocio.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Elegí un rubro y explorá un sistema pensado para vender, organizar
            tareas y controlar mejor cada movimiento.
          </p>
        </div>

        <div className="relative mt-16 min-h-[620px] md:min-h-[560px]">
          <button
            type="button"
            onClick={goPrev}
            className="cursor-pointer absolute left-0 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-3xl font-black text-slate-900 shadow-lg transition hover:border-[#00D38E] hover:bg-[#00D38E] hover:text-[#07111F] md:-left-4"
            aria-label="Demo anterior"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={goNext}
            className="cursor-pointer absolute right-0 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-3xl font-black text-slate-900 shadow-lg transition hover:border-[#00D38E] hover:bg-[#00D38E] hover:text-[#07111F] md:-right-4"
            aria-label="Siguiente demo"
          >
            ›
          </button>

          <div className="relative mx-auto flex min-h-[560px] max-w-6xl items-center justify-center md:min-h-[520px]">
            {demos.map((demo, index) => {
              const position = getPosition(index);

              const positionClasses = {
                center:
                  "z-20 scale-100 opacity-100 translate-x-0 blur-0 pointer-events-auto",
                left:
                  "z-10 -translate-x-[42%] scale-[0.82] opacity-45 blur-[1px] pointer-events-none hidden md:block",
                right:
                  "z-10 translate-x-[42%] scale-[0.82] opacity-45 blur-[1px] pointer-events-none hidden md:block",
                hidden:
                  "z-0 scale-75 opacity-0 pointer-events-none hidden md:block",
              };

              const isCenter = position === "center";

              return (
                <article
                  key={demo.title}
                  className={`absolute w-full max-w-[390px] rounded-[2rem] border bg-white p-7 shadow-xl transition-all duration-500 ease-out md:max-w-[460px] ${isCenter
                    ? "border-[#00D38E] shadow-2xl shadow-[#00D38E]/10"
                    : "border-slate-200"
                    } ${positionClasses[position]}`}
                >
                  <div className="absolute inset-x-8 -top-6 mx-auto flex h-12 w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 shadow-sm">
                    <span className="text-xl">{demo.icon}</span>
                    <span className="text-xs font-black text-slate-600">
                      {demo.tag}
                    </span>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <div
                      className={`flex h-24 w-24 items-center justify-center rounded-[2rem] text-5xl transition ${isCenter
                        ? "bg-[#00D38E] shadow-xl shadow-[#00D38E]/20"
                        : "bg-[#00D38E]/10"
                        }`}
                    >
                      {demo.icon}
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <h3 className="text-3xl font-black text-slate-950">
                      {demo.title}
                    </h3>

                    <p className="mt-5 min-h-[112px] leading-7 text-slate-600">
                      {demo.description}
                    </p>
                  </div>

                  <div className="mt-8">
                    {demo.active ? (
                      <Link
                        to={demo.path}
                        className="cursor-pointer block rounded-2xl bg-slate-950 px-5 py-4 text-center text-sm font-black text-white transition hover:bg-[#00D38E] hover:text-[#07111F]"
                      >
                        Ver demo
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="w-full cursor-not-allowed rounded-2xl bg-slate-200 px-5 py-4 text-sm font-black text-slate-500"
                      >
                        Próximamente
                      </button>
                    )}
                  </div>

                  {isCenter && (
                    <div className="mt-5 rounded-2xl bg-[#00D38E]/10 p-4 text-center">
                      <p className="text-sm font-bold text-emerald-700">
                        Demo destacada
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {demos.map((demo, index) => (
            <button
              key={demo.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer h-2.5 rounded-full transition-all ${index === activeIndex
                ? "w-8 bg-[#00D38E]"
                : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              aria-label={`Ver ${demo.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DemoSection;
