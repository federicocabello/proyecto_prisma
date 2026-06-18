function DemoNotice() {
  return (
    <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-amber-900 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-black uppercase tracking-[0.12em]">
          Demo activa
        </p>
        <p className="text-sm font-semibold leading-6 sm:text-right">
          Pantalla simulada con datos ficticios. Podés probar las funciones sin
          afectar información real.
        </p>
      </div>
    </div>
  );
}

export default DemoNotice;
