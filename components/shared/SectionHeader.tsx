export default function SectionHeader({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="mb-12">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="section-title mt-4 max-w-3xl text-navy">{title}</h1>
      {copy ? (
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ghost">{copy}</p>
      ) : null}
    </div>
  );
}
