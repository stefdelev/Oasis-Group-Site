interface ServiceCardProps {
  tag: string;
  tagType: 'primary' | 'growing' | 'supporting';
  title: string;
  description: string;
  capabilities: string[];
  proofPoints: string;
}

export default function ServiceCard({
  tag,
  tagType,
  title,
  description,
  capabilities,
  proofPoints,
}: ServiceCardProps) {
  const tagStyles = {
    primary: 'bg-electric-teal text-obsidian',
    growing: 'bg-electric-teal/20 text-electric-teal border border-electric-teal/30',
    supporting: 'bg-gray-600/50 text-gray-300 border border-gray-500/30',
  };

  return (
    <div className="bg-slate-card rounded-xl p-8 border border-gray-700/50 hover:border-electric-teal/30 transition-colors duration-300">
      {/* Tag */}
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6 ${tagStyles[tagType]}`}
      >
        {tag}
      </span>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{title}</h3>

      {/* Description */}
      <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>

      {/* Capabilities */}
      <ul className="space-y-2 mb-6">
        {capabilities.map((capability, index) => (
          <li key={index} className="text-gray-200 flex items-start">
            <span className="text-electric-teal mr-2">•</span>
            {capability}
          </li>
        ))}
      </ul>

      {/* Proof Points */}
      <p className="text-gray-400 text-sm italic border-t border-gray-700/50 pt-4">
        {proofPoints}
      </p>
    </div>
  );
}
