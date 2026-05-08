import { type MouseEvent } from 'react';
import GlobeArt from './GlobeArt';

const MARQUEE_ITEMS = [
  'Central Bank of The Bahamas',
  'Sand Dollar CBDC',
  'Bank of Tanzania',
  'Inter-American Development Bank',
  'Forbes',
  'Oasis Onchain',
  'Artisand',
  'Frontier Founders',
];

export default function Hero() {
  const goTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="top">
      <div className="shell hero-grid">
        <div>
          <div className="hero-eyebrow">Boutique advisory · Frontier technology</div>
          <h1 className="hero-title">
            Architects of the<br />
            <em>Digital Frontier.</em>
          </h1>
          <p className="hero-sub">
            We help governments, central banks, and institutions implement digital
            currency, applied AI, and blockchain infrastructure - with the
            practitioner depth that theory alone can't deliver.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary" onClick={(e) => goTo(e, 'contact')}>
              Start a conversation
              <span className="arrow" aria-hidden>→</span>
            </a>
            <a href="#work" className="btn btn-ghost" onClick={(e) => goTo(e, 'work')}>
              See our work
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="num">2017</div>
              <div className="lbl">Advising on<br />digital currency</div>
            </div>
            <div className="hero-stat">
              <div className="num">Trusted by</div>
              <div className="lbl">Sovereign &amp; Institutional<br />Clients</div>
            </div>
            <div className="hero-stat">
              <div className="num">3</div>
              <div className="lbl">Live ventures<br />in production</div>
            </div>
          </div>
        </div>

        <div className="hero-art float-slow">
          <div className="hero-art-frame" aria-hidden />
          <span className="hero-art-bracket tl" aria-hidden />
          <span className="hero-art-bracket tr" aria-hidden />
          <span className="hero-art-bracket bl" aria-hidden />
          <span className="hero-art-bracket br" aria-hidden />
          <GlobeArt />
          <div className="hero-art-meta">
            Reach<br />
            <strong>Caribbean → East Africa</strong>
          </div>
        </div>
      </div>

      <div className="hero-marquee" aria-hidden>
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((t, i) => (
            <span key={i} className="marquee-item">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
