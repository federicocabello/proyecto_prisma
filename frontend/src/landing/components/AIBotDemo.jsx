const messages = [
  {
    from: "client",
    text: "Hola, quería saber si tienen turnos disponibles para mañana.",
  },
  {
    from: "bot",
    text: "¡Hola! Claro 😊 ¿Para qué servicio necesitás el turno: corte, barba o corte + barba?",
  },
  {
    from: "client",
    text: "Corte + barba.",
  },
  {
    from: "bot",
    text: "Perfecto. Tenemos disponibilidad mañana a las 10:30 AM y 4:00 PM. ¿Cuál horario te queda mejor?",
  },
  {
    from: "client",
    text: "A las 4 está bien.",
  },
  {
    from: "bot",
    text: "Listo, puedo reservarlo. Solo necesito tu nombre y número de teléfono para confirmar el turno.",
  },
];

function AIBotDemo() {
  return (
    <section className="bg-slate-50 px-5 py-20 text-slate-900 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-bold text-[#00D38E]">
            Agente automatizado
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            Un asistente virtual puede responder consultas mientras vos atendés tu negocio.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Podemos crear asistentes de respuesta para negocios que reciben
            consultas por WhatsApp, redes sociales o formularios web. El objetivo
            es responder rápido, captar datos del cliente y ordenar la información
            para que ninguna oportunidad se pierda.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-2xl font-black text-slate-950">
                24/7
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Respuesta inicial disponible incluso fuera del horario comercial.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-2xl font-black text-slate-950">
                +Orden
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Captura nombre, teléfono, necesidad y deriva la consulta correcta.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-4xl bg-[#07111F] p-4 shadow-2xl">
          <div className="rounded-3xl bg-[#0B1628] p-5">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm font-bold text-[#00D38E]">
                  Demo de atención automática
                </p>

                <h3 className="text-xl font-black text-white">
                  Conversación de ejemplo
                </h3>
              </div>

              <span className="rounded-full bg-[#00D38E]/10 px-3 py-1 text-xs font-bold text-[#00D38E]">
                Online
              </span>
            </div>

            <div className="space-y-3">
              {messages.map((message, index) => {
                const isBot = message.from === "bot";

                return (
                  <div
                    key={index}
                    className={`flex ${isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                        isBot
                          ? "bg-white/10 text-slate-200"
                          : "bg-[#00D38E] text-[#07111F]"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-400">
              El asistente puede adaptarse al rubro: barberías, ferreterías,
              clínicas, alquileres, servicios técnicos, ventas y más.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIBotDemo;