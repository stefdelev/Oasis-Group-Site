export default function About() {
  return (
    <section id="about" className="section-dark">
      <div className="container-main">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <h2 className="text-3xl md:text-4xl font-bold text-oasisLight mb-8 leading-tight">
              The Global South Deserves Builders, Not Just Advisors
            </h2>

            <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
              <p>
                Most frontier technology is designed in Western markets and exported as an afterthought.
                The result? Frameworks that don't fit local realities, implementations that stall, and
                missed opportunities for the regions that could benefit most.
              </p>

              <p>
                <strong className="text-oasisLight">The Oasis Group exists to change that equation.</strong>
              </p>

              <p>
                We are a consultancy and venture studio headquartered in The Bahamas, working across
                the Caribbean and the broader Global South. We combine deep technical expertise with
                direct experience inside central banks, regulatory bodies, and development institutions.
              </p>

              <p>
                Our founder, Stefen Deleveaux, has advised on digital currency strategy since 2017—years
                before most nations had CBDC on their agenda. That practitioner knowledge, paired with
                a network of specialist partners, allows us to move from policy to production in ways
                that traditional consultancies cannot.
              </p>
            </div>
          </div>

          {/* Pull Quote */}
          <div className="lg:col-span-2">
            <blockquote className="border-l-4 border-oasisAction pl-6 py-4 bg-oasisAction/10 rounded-r-lg">
              <p className="text-xl md:text-2xl font-medium text-oasisLight italic leading-relaxed">
                "Big consultancies deliver frameworks. We deliver implementation—at the speed and
                flexibility institutions actually need."
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
