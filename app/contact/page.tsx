import SectionHeader from "@/components/shared/SectionHeader";
import { getAuthorProfile } from "@/lib/api";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Contact",
};

export default async function ContactPage() {
  const author = await getAuthorProfile();

  if (!author) {
    notFound();
  }

  return (
    <section className="py-20">
      <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeader
            eyebrow="Contact"
            title="For collaborations, interviews, and reader notes."
            copy="Open to book club requests, media conversations, literary collaborations, and thoughtful letters from readers."
          />
          {author.contactEmail ? (
            <div className="ui-text text-sm uppercase tracking-[0.12em] text-ghost">
              Direct email:{" "}
              <a className="text-gold-dim" href={`mailto:${author.contactEmail}`}>
                {author.contactEmail}
              </a>
            </div>
          ) : null}
        </div>
        <form
          action="/api/contact"
          method="post"
          className="grid gap-4 border border-cream-dark bg-white p-7 shadow-[0_12px_36px_rgba(15,27,45,0.08)]"
        >
          {["Name", "Email", "Subject"].map((label) => (
            <label
              key={label}
              className="ui-text text-xs font-bold uppercase tracking-[0.14em] text-ghost"
            >
              {label}
              <input
                required
                name={label.toLowerCase()}
                type={label === "Email" ? "email" : "text"}
                className="mt-2 block min-h-12 w-full border border-cream-dark px-4 text-base normal-case tracking-normal text-ink outline-none focus:border-gold"
              />
            </label>
          ))}
          <label className="ui-text text-xs font-bold uppercase tracking-[0.14em] text-ghost">
            Message
            <textarea
              required
              name="message"
              rows={7}
              className="mt-2 block w-full border border-cream-dark px-4 py-3 text-base normal-case tracking-normal text-ink outline-none focus:border-gold"
            />
          </label>
          <button className="btn btn-primary w-fit">Send Message</button>
        </form>
      </div>
    </section>
  );
}
