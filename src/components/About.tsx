import Reveal from './Reveal';

export default function About() {
  return (
    <section id="about" className="section section-light">
      <div className="shell">
        <Reveal className="section-head">
          <div>
            <div className="section-tag">[ 01 ] Our Mission</div>
            <h2 className="section-title">
              Builders, not<br />
              just <em>advisors.</em>
            </h2>
          </div>
          <p className="section-lead">
            The Oasis Group is a boutique consultancy and venture studio
            headquartered in The Bahamas, pioneering collaborations in frontier
            technology and governance across the Global South.
          </p>
        </Reveal>

        <div className="about-grid">
          <Reveal className="about-copy">
            <p>
              Most frontier technology is designed in Western markets and exported
              as an afterthought. The result: frameworks that don't fit local
              realities, implementations that stall, and missed opportunities for
              the regions that could benefit most.
            </p>
            <p>
              <strong>The Oasis Group exists to change that equation.</strong> We
              combine deep technical expertise with direct experience inside central
              banks, regulatory bodies, and development institutions.
            </p>
            <p>
              Our founder, Stefen Deleveaux, has advised on digital currency
              strategy since 2017; years before most nations had CBDC on their
              agenda. That practitioner knowledge, paired with a network of
              specialist partners, allows us to move from policy to production at
              the speed institutions actually need.
            </p>
          </Reveal>

          <Reveal delay={140} className="about-side">
            <div className="pull-tag">A note from the founder</div>
            <p className="pull">
              "Big consultancies deliver frameworks. We deliver implementation
              at the speed and flexibility institutions actually need."
            </p>
            <hr />
            <div className="signoff">
              <strong>Stefen Deleveaux</strong><br />
              Founder · The Oasis Group<br />
              Nassau, The Bahamas
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
