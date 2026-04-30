export default function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 border-l-2 border-gold bg-cream p-7 font-display text-3xl italic leading-tight text-navy">
      {children}
    </blockquote>
  );
}
