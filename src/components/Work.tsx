import WorkCard from './WorkCard';

const workItems = [
  {
    label: 'Case Study',
    labelType: 'case-study' as const,
    title: 'Economic Infrastructure for Underserved Markets',
    description:
      'Artisand is a live e-commerce marketplace connecting Bahamian artists and artisans directly with customers. Built from the ground up using AI-assisted development, it demonstrates our approach: production-grade platforms that create real economic opportunity.',
    linkText: 'Visit Artisand',
    linkUrl: 'https://www.artisand.art',
    featured: true,
  },
  {
    label: 'Portfolio',
    labelType: 'portfolio' as const,
    title: "The Caribbean's Frontier Tech Ecosystem",
    description:
      "Oasis Onchain is our flagship event: a summit bringing together builders, policymakers, and investors focused on the Global South. Featured in Forbes as part of the region's emerging crypto landscape.",
    linkText: 'Visit Oasis Onchain',
    linkUrl: 'https://www.oasisonchain.xyz',
    featured: false,
  },
  {
    label: 'Portfolio',
    labelType: 'portfolio' as const,
    title: 'Conversations from the Edge',
    description:
      'A podcast exploring frontier technology through the lens of builders actually doing the work. Long-form conversations with founders, policymakers, and technologists shaping the future.',
    linkText: 'Watch on YouTube',
    linkUrl: 'https://www.youtube.com/@OasisFrontierFounders',
    featured: false,
  },
];

export default function Work() {
  return (
    <section id="work" className="section-dark">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-oasisLight mb-4">
            We Build What We Advise
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            As a venture studio, we don't just consult, we build. Here's what that looks like in
            practice.
          </p>
        </div>

        {/* Work Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {workItems.map((item, index) => (
            <WorkCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
