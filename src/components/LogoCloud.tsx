const LOGOS = [
  { name: "TechCorp", url: "https://picsum.photos/seed/logo1/200/100" },
  { name: "Innovate", url: "https://picsum.photos/seed/logo2/200/100" },
  { name: "Future", url: "https://picsum.photos/seed/logo3/200/100" },
  { name: "Global", url: "https://picsum.photos/seed/logo4/200/100" },
  { name: "Vision", url: "https://picsum.photos/seed/logo5/200/100" },
  { name: "Nexus", url: "https://picsum.photos/seed/logo6/200/100" },
];

export function LogoCloud() {
  return (
    <section className="py-12 border-t border-white/5 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[10px] uppercase tracking-[0.4em] text-white/30 mb-8 font-mono">
          Trusted by industry leaders
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          {LOGOS.map((logo) => (
            <div
              key={logo.name}
              className="flex justify-center"
              data-cursor-text={logo.name}
            >
              <img 
                src={logo.url} 
                alt={logo.name} 
                className="h-8 md:h-10 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
