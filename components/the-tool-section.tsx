import Image from 'next/image'

const cards = [
  {
    img: '/photos/phoneFeed.webp',
    alt: 'Hand holding a phone showing a social media feed',
    step: 'Step 🔗',
    stepColor: 'bg-sky text-ink',
    cardColor: 'bg-sky/25',
    rot: '-3deg',
    title: 'Enter Your Post or Reel URL',
    body: 'Paste your Instagram post or Reel URL directly into the tool. It instantly loads every comment from your post so you never miss a single entry. No manual copy-pasting, no spreadsheets, no wasted time.',
  },
  {
    img: '/photos/creatorGlasses.webp',
    alt: 'Creator in glasses laughing with a phone in hand',
    step: 'Step 🎯',
    stepColor: 'bg-sky text-ink',
    cardColor: 'bg-bubble/20',
    rot: '3deg',
    title: 'Set Filters and Pick Winners',
    body: 'Define your entry rules before the draw. Filter out invalid entries, require a specific keyword or hashtag, and choose how many winners you need. Every random comment picker draw is fully transparent and verifiable — your audience will see exactly how the winner was selected.',
  },
]

export function TheToolSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
      <div className="mb-12 text-center">
        <span className="chip inline-block bg-tang px-4 py-1.5 text-[13px] font-bold text-ink">
          The tool 🎰
        </span>
        <h2 className="font-display mx-auto mt-4 max-w-2xl text-balance text-[clamp(1.9rem,4.4vw,3.2rem)] font-bold leading-tight text-ink">
          Pick a Winner from Instagram Comments
        </h2>
      </div>

      <div className="grid gap-7 md:grid-cols-2">
        {cards.map((card) => (
          <article
            key={card.title}
            className={`pop-lg h-full rounded-[34px] ${card.cardColor} p-7`}
          >
            <figure
              className="sticker wiggle mx-auto w-[88%]"
              style={
                {
                  '--rot': card.rot,
                  transform: `rotate(${card.rot})`,
                  aspectRatio: '620 / 420',
                } as React.CSSProperties
              }
            >
              <Image
                src={card.img}
                alt={card.alt}
                width={620}
                height={420}
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 88vw, 44vw"
              />
            </figure>
            <span
              className={`chip mt-7 inline-block px-3 py-1 text-[13px] font-bold ${card.stepColor}`}
            >
              {card.step}
            </span>
            <h3 className="font-display mt-3 text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-tight text-ink">
              {card.title}
            </h3>
            <p className="mt-2.5 text-[15.5px] font-medium leading-relaxed text-ink-soft">
              {card.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
