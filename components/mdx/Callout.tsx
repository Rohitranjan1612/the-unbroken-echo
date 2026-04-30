export default function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 border border-gold/30 bg-gold/10 p-5 text-ink-mid">
      {children}
    </div>
  );
}
