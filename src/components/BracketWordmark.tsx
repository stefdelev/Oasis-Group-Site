type Size = 'sm' | 'md' | 'lg';
type BracketWordmarkProps = {
  size?: Size;
  light?: boolean;
};

export default function BracketWordmark({
  size = 'md',
  light = true,
}: BracketWordmarkProps) {
  const fontSize = size === 'sm' ? 14 : size === 'lg' ? 24 : 16;
  const bracketHeight = fontSize * 1.5;
  const color = light ? '#ffffff' : 'var(--color-ink-900)';

  return (
    <span className="bracket-wordmark" style={{ color }}>
      <span
        className="bracket left"
        style={{ height: bracketHeight }}
        aria-hidden
      />
      <span className="text" style={{ fontSize }}>
        THE <strong>OASIS</strong> GROUP
      </span>
      <span
        className="bracket right"
        style={{ height: bracketHeight }}
        aria-hidden
      />
    </span>
  );
}
