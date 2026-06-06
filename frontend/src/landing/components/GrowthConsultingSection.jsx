const consultingItems = [
  {
    icon: "🔎",
    title: "Diagnóstico comercial",
    description:
      "Analizamos cómo el negocio está mostrando sus servicios, respondiendo consultas y convirtiendo interesados en clientes.",
  },
  {
    icon: "💬",
    title: "Mejora de mensajes",
    description:
      "Ayudamos a ordenar respuestas, textos de venta, preguntas frecuentes y mensajes para captar mejor la atención.",
  },
  {
    icon: "📈",
    title: "Estrategia de conversión",
    description:
      "Detectamos puntos donde se pierden clientes y proponemos mejoras para aumentar consultas, reservas o ventas.",
  },
];

function GrowthConsultingSection() {
  return (
    <section className="bg-[#07111F] px-5 py-20 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-bold text-[#00D38E]">
            Estrategia comercial digital
          </p>

          <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">
            También ayudamos a detectar por qué un negocio no está vendiendo mejor.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Además del desarrollo web, podemos revisar la forma en que un negocio
            presenta sus servicios, responde consultas y convierte interesados en
            clientes. No se trata de manejar redes sociales todos los días, sino
            de mejorar la estrategia, los mensajes y el proceso de venta.
          </p>

          <div className="mt-8 rounded-3xl border border-[#00D38E]/30 bg-[#00D38E]/10 p-6">
            <p className="text-xl font-black text-white">
              No es Community Manager tradicional.
            </p>

            <p className="mt-2 leading-7 text-slate-300">
              Es una asesoría para mejorar la comunicación, el proceso de venta,
              la atención de consultas y la presencia digital del negocio.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {consultingItems.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[#00D38E]/40"
            >
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#00D38E]/10 text-3xl">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-xl font-black text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 leading-7 text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}

          <a
            href="#contacto"
            className="block rounded-2xl bg-[#00D38E] px-6 py-4 text-center font-black text-[#07111F] hover:bg-emerald-300"
          >
            Solicitar diagnóstico
          </a>
        </div>
      </div>
    </section>
  );
}

export default GrowthConsultingSection;