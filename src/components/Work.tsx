import Reveal from './Reveal';
import WorkCard from './WorkCard';

type WorkItem = {
  label: string;
  title: string;
  desc: string;
  link: string;
  href: string;
  img?: string;
};

const WORK_ITEMS: WorkItem[] = [
  {
    label: 'Venture · Bahamas',
    title: 'DARE Advisor',
    desc: 'AI-driven advisor that guides digital-asset businesses through the entire DARE Act registration process — from path selection to document generation.',
    link: 'Visit DARE Advisor',
    href: 'https://dare-advisor.vercel.app',
  },
  {
    label: 'Portfolio · Caribbean',
    title: 'Oasis Onchain',
    desc: 'Our flagship summit bringing together builders, policymakers, and investors focused on the Global South. Featured in Forbes.',
    link: 'Visit Oasis Onchain',
    href: 'https://www.oasisonchain.xyz',
    img: 'oasis-onchain-event.jpeg',
  },
  {
    label: 'Portfolio · Media',
    title: 'Frontier Founders',
    desc: 'A podcast exploring frontier technology through the lens of founders actually doing the work — long-form conversations with builders shaping the future.',
    link: 'Watch on YouTube',
    href: 'https://www.youtube.com/@OasisFrontierFounders',
  },
];

export default function Work() {
  return (
    <section id="work" className="section section-light">
      <div className="shell">
        <Reveal className="section-head">
          <div>
            <div className="section-tag">[ 03 ] Our Work</div>
            <h2 className="section-title">
              Theory meets<br />
              <em>practice.</em>
            </h2>
          </div>
          <p className="section-lead">
            As a venture studio, we don't just consult — we build. Each engagement
            ships infrastructure, ventures, or policy frameworks that operate at
            real-world scale.
          </p>
        </Reveal>

        <Reveal>
          <article className="work-feature">
            <div className="work-feature-art">
              <img
                src="/images/artisand-screen2.png"
                alt="Artisand Marketplace — Discover Island Wonders"
              />
            </div>
            <div className="work-feature-body">
              <span className="work-label">Featured Case Study · Artisand</span>
              <h3 className="work-feature-title">
                Scaling the artisanal economy through AI &amp; Web3.
              </h3>
              <p className="work-feature-desc">
                Artisand is a live e-commerce marketplace connecting Bahamian
                artisans directly with global customers. Built ground-up with
                AI-assisted development on a decentralized platform — production
                infrastructure that creates real economic opportunity.
              </p>
              <a
                href="https://www.artisand.art"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary work-feature-link"
              >
                Visit Artisand
                <span className="arrow" aria-hidden>↗</span>
              </a>
            </div>
          </article>
        </Reveal>

        <div className="work-grid">
          {WORK_ITEMS.map((w, i) => (
            <Reveal key={w.title} delay={i * 80}>
              <WorkCard {...w} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
