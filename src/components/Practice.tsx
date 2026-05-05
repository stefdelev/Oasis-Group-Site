import { useState } from 'react';
import Reveal from './Reveal';

type PracticeArea = {
  num: string;
  tag: string;
  title: string;
  desc: string;
  meta: string;
  capabilities: string[];
  proof: string;
};

const PRACTICE_AREAS: PracticeArea[] = [
  {
    num: '01',
    tag: 'Primary Focus',
    title: 'Digital Currency & Financial Infrastructure',
    desc: 'From policy design to technical implementation, we navigate the full lifecycle of digital currency and blockchain adoption for governments and financial institutions.',
    meta: 'Primary practice',
    capabilities: [
      'CBDC strategy & implementation advisory',
      'Blockchain integration (public + private sector)',
      'Regulatory framework development',
      'Financial inclusion infrastructure',
      'Cross-border payment systems',
    ],
    proof:
      'Advisor to the early Sand Dollar CBDC team in The Bahamas. Consulted with the Bank of Tanzania on digital assets and crypto policy. Multiple engagements with the Inter-American Development Bank.',
  },
  {
    num: '02',
    tag: 'Growing Practice',
    title: 'Applied AI & Emerging Tech',
    desc: "AI is reshaping how institutions operate. We help organizations move beyond the hype to practical, deployable solutions that respect local context.",
    meta: 'Growing practice',
    capabilities: [
      'AI implementation strategy',
      'Infrastructure & tooling assessment',
      'Deployment roadmaps for institutional contexts',
      'AI-assisted product development',
    ],
    proof:
      'Our venture Artisand — a full e-commerce platform built with AI-assisted development — demonstrates what is possible when emerging tools meet real-world institutional needs.',
  },
  {
    num: '03',
    tag: 'Supporting Practice',
    title: 'Digital Coordination & Governance',
    desc: 'New organizational models require new infrastructure. We design systems for transparent contribution tracking, distributed governance, and digital-native coordination.',
    meta: 'Supporting practice',
    capabilities: [
      'DAO architecture & governance design',
      'Contribution tracking systems',
      'Tooling for distributed teams',
      'Public-private coordination frameworks',
    ],
    proof:
      'Experience with Govrn, The DAOist, and pioneering contribution-based governance frameworks for institutions and ecosystems.',
  },
];

export default function Practice() {
  const [open, setOpen] = useState<number>(0);
  const toggle = (i: number) => setOpen(open === i ? -1 : i);

  return (
    <section id="practice" className="section section-dark">
      <div className="shell">
        <Reveal className="section-head">
          <div>
            <div className="section-tag">[ 02 ] What we do</div>
            <h2 className="section-title">
              Expertise at<br />
              the <em>edge.</em>
            </h2>
          </div>
          <p className="section-lead">
            We work at the intersection of policy, technology, and practical
            deployment — across three interconnected verticals.
          </p>
        </Reveal>

        <Reveal className="practice-list">
          {PRACTICE_AREAS.map((p, i) => (
            <button
              key={p.num}
              type="button"
              className={`practice-row ${open === i ? 'open' : ''}`}
              onClick={() => toggle(i)}
              aria-expanded={open === i}
            >
              <div className="practice-num">[ {p.num} ]</div>
              <div className="practice-title-wrap">
                <span className="practice-tag">{p.tag}</span>
                <div className="practice-title">{p.title}</div>
              </div>
              <div className="practice-desc">{p.desc}</div>
              <div className="practice-meta">
                <span>{p.meta}</span>
                <span className="practice-toggle" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </div>
              <div className="practice-detail">
                <ul className="practice-cap-list">
                  {p.capabilities.map((c, j) => (
                    <li key={j}>{c}</li>
                  ))}
                </ul>
                <div className="practice-proof">
                  <span className="label">Proof points</span>
                  {p.proof}
                </div>
              </div>
            </button>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
