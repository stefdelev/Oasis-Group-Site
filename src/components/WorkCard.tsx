import { ArrowRight } from 'lucide-react';

interface WorkCardProps {
  label: string;
  labelType: 'case-study' | 'portfolio';
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
  featured?: boolean;
}

export default function WorkCard({
  label,
  labelType,
  title,
  description,
  linkText,
  linkUrl,
  featured = false,
}: WorkCardProps) {
  const labelStyles = {
    'case-study': 'bg-cantaloupe text-obsidian',
    portfolio: 'bg-electric-teal/20 text-electric-teal border border-electric-teal/30',
  };

  return (
    <div
      className={`bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Label */}
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${labelStyles[labelType]}`}
      >
        {label}
      </span>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold text-obsidian mb-3">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

      {/* Link */}
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-electric-teal font-semibold hover:brightness-125 transition-all duration-300 group"
      >
        {linkText}
        <ArrowRight
          size={18}
          className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
        />
      </a>
    </div>
  );
}
