import Image from 'next/image'

const items = [
  {
    n: '1',
    color: 'bg-bubble text-ink',
    title: 'Choose the right prize',
    body: 'Choose a prize that genuinely matches your audience — a relevant prize attracts real followers, not just prize hunters.',
  },
  {
    n: '2',
    color: 'bg-sky text-ink',
    title: 'Set clear entry rules',
    body: 'Set clear entry rules using popular formats like a tag-a-friend contest, a keyword or hashtag entry, or a simple comment to win.',
  },
  {
    n: '3',
    color: 'bg-lime text-ink',
    title: 'Define your timeline',
    body: 'Define your timeline with a clear start date, end date, and winner announcement date.',
  },
  {
    n: '4',
    color: 'bg-tang text-ink',
    title: 'Use a trusted picker',
    body: 'Use a trusted random comment picker to remove any suspicion of bias.',
  },
  {
    n: '5',
    color: 'bg-grape text-white',
    title: 'Announce publicly',
    body: 'Finally, announce your winner publicly and show your audience the draw was done with a verified Instagram giveaway tool. Transparency is what turns a one-time giveaway into a long-term audience growth strategy.',
  },
]

export function GiveawaysSection() {
  return (
    <section id="fair" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="lg:sticky lg:top-10 lg:self-start">
          <span className="chip inline-block bg-lime px-4 py-1.5 text-[13px] font-bold text-ink">
            The playbook 📋
          </span>
          <h2 className="font-display mt-4 text-balance text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.02] text-ink">
            How to Run a Fair Instagram Giveaway
          </h2>
          <p className="mt-4 max-w-sm text-[16.5px] font-medium leading-relaxed text-ink-soft">
            A successful{' '}
            <strong className="font-bold text-ink">Instagram giveaway</strong>{' '}
            starts long before you hit pick. Follow these steps to grow a real,
            trusting audience.
          </p>
          <div className="mt-8 w-[80%]">
            <figure
              className="sticker wiggle"
              style={
                {
                  '--rot': '-3deg',
                  transform: 'rotate(-3deg)',
                  aspectRatio: '560 / 420',
                } as React.CSSProperties
              }
            >
              <Image
                src="/photos/gift.webp"
                alt="A pink gift box tied with gold ribbon"
                width={560}
                height={420}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 80vw, 360px"
              />
            </figure>
          </div>
        </div>

        <ol className="space-y-5">
          {items.map((item) => (
            <li
              key={item.n}
              className="pop flex gap-5 rounded-[28px] bg-white p-5 sm:p-6"
            >
              <span
                className={`pop ${item.color} grid h-12 w-12 shrink-0 place-items-center rounded-2xl font-display text-xl font-bold`}
              >
                {item.n}
              </span>
              <div>
                <h3 className="font-display text-[20px] font-bold text-ink">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[15.5px] font-medium leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
