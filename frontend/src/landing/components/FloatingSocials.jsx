const socials = [
  {
    label: "WhatsApp",
    handle: "Escribime",
    href: "https://wa.me/5492604659499",
    icon: "/icono_wsp.png",
    className: "floating-social--whatsapp",
  },
  {
    label: "Instagram",
    handle: "@proyectoprisma.com.ar",
    href: "https://www.instagram.com/proyectoprisma.com.ar/",
    icon: "/icono_ig.png",
    className: "floating-social--instagram",
  },
];

function FloatingSocials() {
  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-2 sm:bottom-6 sm:right-6">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${social.label}: ${social.handle}`}
          className={`floating-social relative flex h-12 w-12 items-center justify-center rounded-2xl border p-2 text-sm font-black shadow-xl shadow-black/25 backdrop-blur transition hover:-translate-y-1 ${social.className}`}
        >
          <span className="floating-social__label hidden whitespace-nowrap rounded-xl bg-[#07111F] px-3 py-2 text-xs text-white shadow-lg shadow-black/20 sm:block">
            {social.handle}
          </span>
          <span className="flex h-8 w-8 items-center justify-center">
            <img
              src={social.icon}
              alt=""
              className="h-full w-full object-contain"
            />
          </span>
        </a>
      ))}
    </div>
  );
}

export default FloatingSocials;
