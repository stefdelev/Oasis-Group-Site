export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-oasisDeep py-12 border-t border-white/5">
      <div className="container-main">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Side */}
          <div className="text-center md:text-left">
            <p className="text-oasisLight font-bold text-xl mb-1">The Oasis Group</p>
            <p className="text-gray-400 text-sm">Bringing Frontier Tech Home</p>
          </div>

          {/* Right Side */}
          <div className="text-center md:text-right">
            <a
              href="mailto:hello@theoasisgroup.xyz"
              className="text-electric-teal hover:brightness-125 transition-colors duration-300 font-medium"
            >
              hello@theoasisgroup.xyz
            </a>
            <p className="text-gray-400 text-sm mt-2">&copy; {currentYear} The Oasis Group</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
