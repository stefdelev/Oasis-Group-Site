import ServiceCard from './ServiceCard';

const services = [
  {
    tag: 'Primary Focus',
    tagType: 'primary' as const,
    title: 'Digital Currency & Financial Infrastructure',
    description:
      'From policy design to technical implementation, we help governments and financial institutions navigate the full lifecycle of digital currency and blockchain adoption.',
    capabilities: [
      'CBDC strategy and implementation advisory',
      'Blockchain integration for public and private sector',
      'Regulatory framework development',
      'Financial inclusion infrastructure',
    ],
    proofPoints:
      'Advisor to the early CBDC "SandDollar" research and current adoption team in the Bahamas · Consulted Bank of Tanzania on digital assets and crypto policy · Multiple engagements with the Inter-American Development Bank',
  },
  {
    tag: 'Growing Practice',
    tagType: 'growing' as const,
    title: 'Applied AI & Emerging Tech',
    description:
      "AI is changing how institutions work. We help organizations figure out what's actually useful and get it running.",
    capabilities: [
      'AI implementation strategy',
      'Infrastructure and tooling assessment',
      'Deployment roadmaps for institutional contexts',
    ],
    proofPoints:
      "Our venture Artisand—a full e-commerce platform built using AI-assisted development—demonstrates what's possible when emerging tools meet real-world needs.",
  },
  {
    tag: 'Supporting Practice',
    tagType: 'supporting' as const,
    title: 'Digital Coordination & Governance',
    description:
      'New organizational models require new infrastructure. We design systems for transparent contribution tracking, distributed governance, and online coordination.',
    capabilities: [
      'DAO architecture and governance design',
      'Contribution tracking systems',
      'Organizational tooling for distributed teams',
    ],
    proofPoints:
      'Experience with DAOs, and pioneering contribution-based governance frameworks.',
  },
];

export default function Services() {
  return (
    <section id="services" className="section-dark">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-oasisLight mb-4">What We Do</h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            We work at the intersection of policy, technology, and practical deployment. Our
            services span three interconnected verticals.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
