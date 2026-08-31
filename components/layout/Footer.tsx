import Link from "next/link";
import { getFeaturedBookBuyLinks } from "@/lib/api";
import { siteConfig } from "@/lib/config";

export default async function Footer() {
  const buyLinks = await getFeaturedBookBuyLinks();
  const buyColumnLinks: [string, string][] = [];

  if (buyLinks?.amazon) {
    buyColumnLinks.push(["Amazon", buyLinks.amazon]);
  }
  if (buyLinks?.flipkart) {
    buyColumnLinks.push(["Flipkart", buyLinks.flipkart]);
  }
  if (buyLinks?.bluerose) {
    buyColumnLinks.push(["BlueRose", buyLinks.bluerose]);
  }

  return (
    <footer className="bg-navy px-0 py-14 text-cream">
      <div
        className={`container grid gap-10 ${
          buyColumnLinks.length > 0
            ? "md:grid-cols-[1.4fr_1fr_1fr_1fr]"
            : "md:grid-cols-[1.4fr_1fr_1fr]"
        }`}
      >
        <div>
          <Link href="/" className="font-display text-3xl font-semibold">
            The <span className="text-gold">Unbroken</span> Echo
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-cream/62">
            {siteConfig.description}
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
        {buyColumnLinks.length > 0 ? (
          <FooterColumn title="Buy the Book" links={buyColumnLinks} />
        ) : null}
      </div>
      <div className="container mt-12 flex flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-cream/48 md:flex-row md:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.author}. All
          rights reserved.
        </p>
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
            <Link
              className="transition hover:text-gold"
              href={href}
              {...(href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
