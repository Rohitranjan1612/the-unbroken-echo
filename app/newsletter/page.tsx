import NewsletterForm from "@/components/shared/NewsletterForm";

export const metadata = {
  title: "Newsletter",
};

export default function NewsletterPage() {
  return (
    <section className="bg-navy py-24 text-center text-cream">
      <div className="reading">
        <span className="eyebrow">Newsletter</span>
        <h1 className="display-title mt-6">
          Letters from <em className="text-gold">the echo.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-cream/68">
          Stories, thoughts, and occasional letters from Rohit Ranjan. No noise.
          Just words that linger.
        </p>
        <NewsletterForm cta="Join the List" />
      </div>
    </section>
  );
}
