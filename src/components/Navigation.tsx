import { useEffect, useState, type MouseEvent } from 'react';
import BracketWordmark from './BracketWordmark';

const NAV_ITEMS = [
  { id: 'about',    label: 'About'    },
  { id: 'practice', label: 'Practice' },
  { id: 'work',     label: 'Work'     },
  { id: 'contact',  label: 'Contact'  },
] as const;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let current = '';
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 120 && r.bottom > 200) current = id;
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const goTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="shell nav-row">
        <a href="#top" onClick={goTop} className="nav-mark" aria-label="The Oasis Group home">
          <BracketWordmark size="sm" light />
        </a>

        <div className="nav-links">
          {NAV_ITEMS.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={`nav-link ${active === it.id ? 'active' : ''}`}
              onClick={(e) => goTo(e, it.id)}
            >
              {it.label}
            </a>
          ))}
          <a
            href="#contact"
            className="nav-cta"
            onClick={(e) => goTo(e, 'contact')}
          >
            Partner with us
            <span className="arrow" aria-hidden>→</span>
          </a>
        </div>

        <button
          type="button"
          className="nav-burger"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6L18 18M6 18L18 6" />
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      <div className={`nav-mobile shell ${mobileOpen ? 'open' : ''}`}>
        {NAV_ITEMS.map((it) => (
          <a key={it.id} href={`#${it.id}`} onClick={(e) => goTo(e, it.id)}>
            {it.label}
          </a>
        ))}
        <a href="#contact" onClick={(e) => goTo(e, 'contact')}>
          Partner with us →
        </a>
      </div>
    </nav>
  );
}
