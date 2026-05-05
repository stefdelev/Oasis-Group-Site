import BracketWordmark from './BracketWordmark';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <BracketWordmark size="md" light />
            <p>
              Boutique advisory and venture studio building the digital
              frontier — from the Caribbean to the Global South.
            </p>
          </div>
          <div className="footer-col">
            <h4>Practice</h4>
            <ul>
              <li><a href="#practice">Digital Currency</a></li>
              <li><a href="#practice">Applied AI</a></li>
              <li><a href="#practice">Coordination &amp; Governance</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Ventures</h4>
            <ul>
              <li><a href="#work">Artisand</a></li>
              <li><a href="#work">DARE Advisor</a></li>
              <li><a href="#work">Oasis Onchain</a></li>
              <li><a href="#work">Frontier Founders</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              <li><a href="mailto:hello@theoasisgroup.xyz">Email</a></li>
              <li>
                <a
                  href="https://linkedin.com/company/theoasisgroup"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@OasisFrontierFounders"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 The Oasis Group · Nassau, The Bahamas</span>
          <span>Bringing frontier tech home</span>
        </div>
      </div>
    </footer>
  );
}
