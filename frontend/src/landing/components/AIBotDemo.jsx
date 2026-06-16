const messages = [
  {
    from: "client",
    text: "Hola, ¿tenés turno para corte y barba mañana?",
  },
  {
    from: "bot",
    text: "¡Hola! Sí. Mañana tengo 10:30, 16:00 y 18:30. ¿Cuál te sirve?",
  },
  {
    from: "client",
    text: "A las 16:00.",
  },
  {
    from: "bot",
    text: "Perfecto. ¿Me pasás tu nombre para dejarlo reservado?",
  },
  {
    from: "client",
    text: "Martín López.",
  },
  {
    from: "bot",
    text: "Listo Martín, te agendé mañana a las 16:00 para corte y barba. Te mando recordatorio antes del turno.",
  },
];

function AIBotDemo() {
  return (
    <section className="bg-slate-50 px-5 py-20 text-slate-900 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-bold text-[#00D38E]">
            Chatbot con IA
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            Desarrollamos agentes automatizados para atender a tus clientes.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Responden consultas, toman datos y ayudan a convertir mensajes en
            ventas, turnos o pedidos desde WhatsApp, redes o tu web.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-2xl font-black text-slate-950">
                24/7
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Atiende consultas fuera del horario comercial.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-2xl font-black text-slate-950">
                + Control
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Pide datos, ordena pedidos y evita perder oportunidades.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-4xl bg-[#07111F] p-4 shadow-2xl">
          <div className="rounded-3xl bg-[#0B1628] p-5">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm font-bold text-[#00D38E]">
                  Ejemplo real
                </p>

                <h3 className="text-xl font-black text-white">
                  Reserva de turno
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
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${isBot
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
              Se adapta a turnos, pedidos, presupuestos, consultas frecuentes y
              seguimiento de clientes.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIBotDemo;
