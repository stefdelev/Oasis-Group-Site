export default function Hero() {
  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen bg-oasisDeep flex items-center justify-center relative overflow-hidden">
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-obsidian/30 via-transparent to-slate-dark/50" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, #14B8A6 1px, transparent 1px), linear-gradient(to bottom, #14B8A6 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Radial teal glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-oasisAction/10 to-transparent pointer-events-none" />

      <div className="container-main relative z-10 text-center py-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-oasisLight mb-6 leading-tight">
          Bringing Frontier Tech Home
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
          We help governments and institutions implement digital currency, blockchain infrastructure,
          and emerging technology—with practitioner depth that theory alone can't deliver.
        </p>

        <a
          href="#contact"
          onClick={handleCTAClick}
          className="btn-primary inline-block text-lg"
        >
          Start a Conversation
        </a>

        <p className="text-slate-400 text-sm mt-10">
          Advising on digital currency since 2017 · Caribbean to East Africa
        </p>
      </div>
    </section>
  );
}
