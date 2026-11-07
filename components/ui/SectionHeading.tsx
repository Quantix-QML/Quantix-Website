type SectionHeadingProps = {
  kicker: string;
  index: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
};

export function SectionHeading({ kicker, index, children, aside }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div>
        <div className="section-kicker">{kicker} <span>— {index}</span></div>
        {children}
      </div>
      {aside && <div className="section-heading-aside">{aside}</div>}
    </div>
  );
}
