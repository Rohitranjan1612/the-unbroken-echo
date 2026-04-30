import Link from "next/link";

const links = [
  { href: "/books", label: "Books" },
  { href: "/poetry", label: "Poetry" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-navy/95 backdrop-blur-xl">
      <nav className="container flex h-[68px] items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-[1.35rem] font-semibold tracking-wide text-cream"
        >
          The <span className="text-gold">Unbroken</span> Echo
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="ui-text border-b border-transparent pb-1 text-xs font-bold uppercase tracking-[0.16em] text-cream/70 transition hover:border-gold hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link href="/newsletter" className="btn btn-outline hidden sm:inline-flex">
          Newsletter
        </Link>
      </nav>
    </header>
  );
}
