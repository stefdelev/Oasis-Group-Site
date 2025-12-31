import { ArrowRight } from 'lucide-react';

export default function Press() {
  return (
    <section className="bg-oasisDeep py-20 md:py-28">
      <div className="container-main">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-oasisLight mb-12">In the Press</h2>

          {/* Press Item */}
          <div className="max-w-2xl mx-auto bg-slate-dark/50 rounded-xl p-8 border border-gray-700/50">
            {/* Forbes Logo/Text */}
            <p className="text-oasisLight font-bold text-2xl mb-4 tracking-wide">Forbes</p>

            {/* Headline */}
            <h3 className="text-xl md:text-2xl font-semibold text-oasisLight mb-3">
              Crypto Carib: Hotter Than Davos
            </h3>

            {/* Description */}
            <p className="text-slate-300 mb-6">
              Coverage of the Caribbean's emerging position in the global crypto landscape,
              featuring Oasis Onchain.
            </p>

            {/* Link */}
            <a
              href="https://www.forbes.com/sites/digital-assets/2024/01/26/crypto-carib-hotter-than-davos/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-oasisAction font-semibold hover:brightness-125 transition-all duration-300 group"
            >
              Read Article
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
