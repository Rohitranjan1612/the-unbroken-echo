import SectionHeader from "@/components/shared/SectionHeader";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy py-20 text-cream">
        <div className="container grid gap-10 lg:grid-cols-[360px_1fr] lg:items-center">
          <div className="flex aspect-[4/5] items-center justify-center border border-gold/25 bg-navy-mid">
            <div className="text-center">
              <div className="mx-auto mb-5 h-24 w-24 rounded-full border border-gold/40" />
              <p className="ui-text text-xs uppercase tracking-[0.18em] text-cream/45">
                Author Photo
              </p>
            </div>
          </div>
          <div>
            <span className="eyebrow">The Author</span>
            <h1 className="display-title mt-5">
              Rohit <em className="text-gold">Ranjan</em>
            </h1>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="tag bg-gold text-navy">Software Engineer</span>
              <span className="tag bg-cream/10 text-cream">Debut Author</span>
              <span className="tag bg-cream/10 text-cream">Storyteller</span>
            </div>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/68">
              Rohit Ranjan is a software engineer by profession and storyteller
              by passion. Born in India, he weaves personal experiences into
              heartfelt narratives that explore love, resilience, and human
              connection.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid gap-10 lg:grid-cols-[1fr_320px]">
          <article className="prose-echo">
            <SectionHeader
              eyebrow="Story"
              title="The story behind the story."
            />
            <p>
              Writing has always been the thing Rohit returned to. Even through
              years of engineering, late-night deployments, and sprint planning,
              there was always a document open somewhere, a character waiting, a
              sentence asking to be rewritten at midnight.
            </p>
            <p>
              The Unbroken Echo began as a private thing: a way of thinking
              through people, places, and moments that refused to leave quietly.
              It became a book, and now it is growing into a home for stories,
              poems, essays, and future creative tools.
            </p>
            <p>
              Rohit writes about what lingers: the phone call almost made, the
              person who left without explanation, and the way a certain light at
              a certain time of day can still remember someone.
            </p>
          </article>
          <aside className="h-fit border border-cream-dark bg-white p-7">
            <h2 className="ui-text text-xs font-bold uppercase tracking-[0.16em] text-gold-dim">
              By the Numbers
            </h2>
            <div className="mt-6 space-y-6">
              <Stat value="1" label="Published Book" />
              <Stat value="2025" label="Debut Year" />
              <Stat value="∞" label="Stories still to tell" />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-5xl text-navy">{value}</div>
      <div className="ui-text text-xs uppercase tracking-[0.14em] text-ghost">
        {label}
      </div>
    </div>
  );
}
