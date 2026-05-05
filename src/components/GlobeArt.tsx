const NODES: Array<[number, number]> = [
  [180, 180],
  [310, 200],
  [200, 300],
  [330, 320],
  [150, 260],
  [285, 145],
];

export default function GlobeArt() {
  return (
    <svg
      viewBox="0 0 480 480"
      xmlns="http://www.w3.org/2000/svg"
      className="hero-art-svg"
      aria-hidden
    >
      <defs>
        <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(201,169,97,0.18)" />
          <stop offset="60%"  stopColor="rgba(201,169,97,0.04)" />
          <stop offset="100%" stopColor="rgba(201,169,97,0)" />
        </radialGradient>
        <linearGradient id="meridian" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(201,169,97,0)" />
          <stop offset="50%"  stopColor="rgba(201,169,97,0.55)" />
          <stop offset="100%" stopColor="rgba(201,169,97,0)" />
        </linearGradient>
      </defs>

      <circle cx="240" cy="240" r="220" fill="url(#globeGlow)" />

      <circle cx="240" cy="240" r="180" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
      <circle cx="240" cy="240" r="140" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 6" />
      <circle cx="240" cy="240" r="100" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

      <ellipse cx="240" cy="240" rx="180" ry="60"  fill="none" stroke="rgba(91,139,149,0.30)" strokeWidth="0.8" />
      <ellipse cx="240" cy="240" rx="180" ry="100" fill="none" stroke="rgba(91,139,149,0.22)" strokeWidth="0.8" />
      <ellipse cx="240" cy="240" rx="180" ry="140" fill="none" stroke="rgba(91,139,149,0.16)" strokeWidth="0.8" />

      <ellipse cx="240" cy="240" rx="60"  ry="180" fill="none" stroke="url(#meridian)" strokeWidth="1" />
      <ellipse cx="240" cy="240" rx="100" ry="180" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.8" />
      <ellipse cx="240" cy="240" rx="140" ry="180" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />

      <line x1="60"  y1="240" x2="420" y2="240" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
      <line x1="240" y1="60"  x2="240" y2="420" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />

      {NODES.map(([cx, cy], i) => (
        <g key={i}>
          <circle
            cx={cx}
            cy={cy}
            r="14"
            fill="rgba(201,169,97,0.12)"
            className="globe-pulse"
            style={{ animationDelay: `${i * 0.5}s`, transformOrigin: `${cx}px ${cy}px` }}
          />
          <circle cx={cx} cy={cy} r="3.5" fill="#C9A961" />
        </g>
      ))}

      <g stroke="rgba(201,169,97,0.35)" strokeWidth="0.8" fill="none">
        <path d="M 180 180 Q 240 130 310 200" />
        <path d="M 180 180 Q 220 240 200 300" />
        <path d="M 310 200 Q 360 250 330 320" />
        <path d="M 200 300 Q 270 310 330 320" />
        <path d="M 150 260 Q 180 220 180 180" />
      </g>

      <g stroke="rgba(255,255,255,0.4)" strokeWidth="1">
        <line x1="60"  y1="60"  x2="80"  y2="60" /><line x1="60"  y1="60"  x2="60"  y2="80" />
        <line x1="420" y1="60"  x2="400" y2="60" /><line x1="420" y1="60"  x2="420" y2="80" />
        <line x1="60"  y1="420" x2="80"  y2="420" /><line x1="60"  y1="420" x2="60"  y2="400" />
        <line x1="420" y1="420" x2="400" y2="420" /><line x1="420" y1="420" x2="420" y2="400" />
      </g>
    </svg>
  );
}
