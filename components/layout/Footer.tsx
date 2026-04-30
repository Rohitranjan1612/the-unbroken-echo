import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy px-0 py-14 text-cream">
      <div className="container grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="font-display text-3xl font-semibold">
            The <span className="text-gold">Unbroken</span> Echo
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-cream/62">
            A literary platform for stories, poems, and reflections exploring
            memory, love, and the quiet echoes we carry.
          </p>
        </div>

        <FooterColumn
          title="Explore"
          links={[
            ["Books", "/books"],
            ["Poetry", "/poetry"],
            ["Blog", "/blog"],
            ["Newsletter", "/newsletter"],
          ]}
        />
        <FooterColumn
          title="Author"
          links={[
            ["About", "/about"],
            ["Contact", "/contact"],
            ["Web Novel", "/novels"],
          ]}
        />
        <FooterColumn
          title="Buy the Book"
          links={[
            ["Amazon", "#"],
            ["Flipkart", "#"],
            ["BlueRose", "#"],
          ]}
        />
      </div>
      <div className="container mt-12 flex flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-cream/48 md:flex-row md:justify-between">
        <p>© 2026 The Unbroken Echo · Rohit Ranjan. All rights reserved.</p>
        <p>Built with Next.js · Deployed on Vercel</p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h2 className="ui-text text-xs font-bold uppercase tracking-[0.16em] text-gold">
        {title}
      </h2>
      <ul className="mt-4 space-y-2 text-sm text-cream/65">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link className="transition hover:text-gold" href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
