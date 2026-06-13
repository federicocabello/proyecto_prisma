const socials = [
  {
    label: "WhatsApp",
    handle: "Escribime",
    href: "https://wa.me/5492604659499",
    icon: "/icono_wsp.png",
    className: "bg-[#00D38E] text-[#07111F] hover:bg-emerald-300",
  },
  {
    label: "Instagram",
    handle: "@fedeecabello",
    href: "https://www.instagram.com/fedeecabello/",
    icon: "/icono_ig.png",
    className: "bg-white text-slate-950 hover:bg-slate-100",
  },
];

function FloatingSocials() {
  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${social.label}: ${social.handle}`}
          className={`group flex items-center justify-end gap-2 rounded-full border border-white/10 px-3 py-2 text-sm font-black shadow-2xl shadow-black/25 transition hover:-translate-y-1 ${social.className}`}
        >
          <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-xs opacity-0 transition-all duration-300 group-hover:max-w-32 group-hover:opacity-100 sm:block">
            {social.handle}
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#07111F] p-2">
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
