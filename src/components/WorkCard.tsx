type WorkCardProps = {
  label: string;
  title: string;
  desc: string;
  link: string;
  href: string;
  img?: string;
};

export default function WorkCard({ label, title, desc, link, href, img }: WorkCardProps) {
  const isImg = Boolean(img);
  const cls = `work-card${isImg ? ' work-card-img' : ''}`;
  const style = img
    ? {
        backgroundImage: `linear-gradient(to bottom, rgba(10,27,51,0.35) 0%, rgba(10,27,51,0.82) 60%), url(/images/${img})`,
      }
    : undefined;

  return (
    <article className={cls} style={style}>
      <span className="work-label">{label}</span>
      <h4 className="work-card-title">{title}</h4>
      <p className="work-card-desc">{desc}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="work-card-link"
      >
        {link} <span className="arrow" aria-hidden>↗</span>
      </a>
    </article>
  );
}
