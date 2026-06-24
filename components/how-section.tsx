import Image from 'next/image'

const steps = [
  {
    n: '1',
    color: 'bg-sky text-ink',
    title: 'Paste Your Instagram Post or Reel Link',
    body: 'Copy your post or Reel URL and paste it into the tool. All comments are fetched automatically in seconds — works with both feed posts and Reels.',
    img: '/photos/phoneFeed.webp',
    alt: 'Hand holding a phone showing a social media feed',
    rot: '-4deg',
    imageFirst: false,
  },
  {
    n: '2',
    color: 'bg-lime text-ink',
    title: 'Filter Spam and Keywords',
    body: (
      <>
        Set your entry rules before running the draw. Remove{' '}
        <strong className="font-bold text-ink">spam entries</strong>, filter by
        keyword or hashtag to ensure only qualified entries are counted. A clean
        entry list means a fair result every time.
      </>
    ),
    img: '/photos/cafe.webp',
    alt: 'Creator at a cafe using a phone',
    rot: '4deg',
    imageFirst: true,
  },
  {
    n: '3',
    color: 'bg-bubble text-ink',
    title: 'Pick a Random Instagram Giveaway Winner',
    body: (
      <>
        Hit pick and the tool uses a{' '}
        <strong className="font-bold text-ink">
          cryptographically secure random selection
        </strong>{' '}
        to choose your winner — completely unbiased and impossible to
        manipulate. Need more than one winner? Set your number and the{' '}
        <strong className="font-bold text-ink">
          Instagram giveaway winner picker
        </strong>{' '}
        selects them all at once. This is how creators and brands run fair{' '}
        <strong className="font-bold text-ink">Instagram contests</strong> and{' '}
        <strong className="font-bold text-ink">Instagram raffles</strong> every
        day.
      </>
    ),
    img: '/photos/crowd.webp',
    alt: 'A crowd celebrating under falling confetti',
    rot: '-4deg',
    imageFirst: false,
  },
  {
    n: '4',
    color: 'bg-tang text-ink',
    title: 'Announce Your Giveaway Winner',
    body: (
      <>
        Share your results instantly. The tool generates a shareable winner card
        you can post to your story or feed. Announcing your{' '}
        <strong className="font-bold text-ink">giveaway winner</strong>{' '}
        publicly builds audience trust and drives even more participation in
        your next <strong className="font-bold text-ink">Instagram giveaway</strong>.
      </>
    ),
    img: '/photos/congrats.webp',
    alt: 'A congratulations card beside a wrapped gift',
    rot: '4deg',
    imageFirst: true,
  },
]

export function HowSection() {
  return (
    <section
      id="how"
      className="relative scroll-mt-24 overflow-hidden border-y-[3px] border-ink bg-sun/25 py-20 sm:py-28"
    >
      <svg
        className="floaty absolute left-[6%] top-16 h-9 w-9 text-bubble"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 0c.6 6 5.4 10.8 11.4 11.4v1.2C17.4 13.2 12.6 18 12 24c-.6-6-5.4-10.8-11.4-11.4v-1.2C6.6 10.8 11.4 6 12 0Z" />
      </svg>
      <svg
        className="floaty-slow absolute right-[8%] top-24 h-10 w-10 text-sky"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="#2c2147"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="m12 2 2.9 6.2 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 21l1.3-6.7-5-4.6 6.8-.8L12 2Z" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="text-center">
          <span className="chip inline-block bg-white px-4 py-1.5 text-[13px] font-bold text-ink">
            How it works ⚡
          </span>
          <h2 className="font-display mx-auto mt-4 max-w-3xl text-balance text-[clamp(2rem,5vw,3.6rem)] font-bold leading-none text-ink">
            How Does the Instagram Comment Picker Work?
          </h2>
        </div>

        <div className="mt-14 space-y-7">
          {steps.map((step) => (
            <article
              key={step.n}
              className={`pop-lg grid items-center gap-6 rounded-[34px] bg-white p-6 sm:grid-cols-[auto_1fr_auto] sm:gap-9 sm:p-8 ${
                step.imageFirst ? 'sm:[&>figure]:order-first' : ''
              }`}
            >
              <span
                className={`pop ${step.color} grid h-16 w-16 shrink-0 place-items-center rounded-2xl font-display text-3xl font-bold`}
              >
                {step.n}
              </span>
              <div>
                <h3 className="font-display text-[clamp(1.4rem,3vw,2rem)] font-bold leading-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xl text-[15.5px] font-medium leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </div>
              <figure
                className="sticker wiggle w-full sm:w-56"
                style={
                  {
                    '--rot': step.rot,
                    transform: `rotate(${step.rot})`,
                    aspectRatio: '300 / 220',
                  } as React.CSSProperties
                }
              >
                <Image
                  src={step.img}
                  alt={step.alt}
                  width={300}
                  height={220}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 640px) 100vw, 224px"
                />
              </figure>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
