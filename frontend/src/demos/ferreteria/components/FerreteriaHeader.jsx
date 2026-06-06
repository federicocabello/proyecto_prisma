import { Link } from "react-router-dom";

function FerreteriaHeader() {
  return (
    <header className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-bold text-[#00D38E]">Sistema demo</p>

          <h2 className="mt-2 text-3xl font-black text-slate-950 md:text-4xl">
            Ferretería Central
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Panel de prueba para controlar productos, stock, ventas,
            proveedores y movimientos diarios de una ferretería.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            Volver a inicio
          </Link>

          <a
            href="#"
            className="rounded-2xl bg-[#00D38E] px-5 py-3 text-sm font-bold text-[#07111F] hover:bg-emerald-300"
          >
            Quiero este sistema
          </a>
        </div>
      </div>
    </header>
  );
}

export default FerreteriaHeader;