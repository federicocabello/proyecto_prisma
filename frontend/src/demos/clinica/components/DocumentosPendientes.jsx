const documents = [
  {
    patient: "Luis Fernández",
    document: "Resultado de laboratorio",
    status: "Pendiente",
  },
  {
    patient: "María Torres",
    document: "Documento de identidad",
    status: "Falta cargar",
  },
  {
    patient: "Carlos Méndez",
    document: "Orden médica",
    status: "Revisar",
  },
];

function DocumentosPendientes() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">
          Documentos pendientes
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Control de documentación y seguimiento administrativo.
        </p>
      </div>

      <div className="space-y-4">
        {documents.map((item) => (
          <div
            key={`${item.patient}-${item.document}`}
            className="rounded-2xl border border-slate-200 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-black text-slate-950">
                  {item.patient}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {item.document}
                </p>
              </div>

              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F]">
        Ver documentos
      </button>
    </section>
  );
}

export default DocumentosPendientes;