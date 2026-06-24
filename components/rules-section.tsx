const rules = [
  'State your entry method, prize, eligibility, start and end date clearly in your caption.',
  'Always include a disclaimer that your promotion is not sponsored, endorsed, or administered by Instagram.',
  'Never ask participants to tag themselves in content they do not appear in — tag-a-friend entries are allowed only when tagging real people.',
  'Follow your local laws on prize promotions, including any age restrictions or regional requirements.',
  'Keep a record of your draw result so you can verify the outcome if any participant questions it.',
]

export function RulesSection() {
  return (
    <section
      id="rules"
      className="relative scroll-mt-24 overflow-hidden border-y-[3px] border-ink bg-grape py-20 text-white sm:py-28"
    >
      <svg
        className="floaty-slow absolute -right-16 top-10 h-72 w-72 text-white/10"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M48.7-58.8C62.3-47.4 71.7-30.7 74-13.2 76.3 4.4 71.5 22.8 61 36.9 50.4 51 34.2 60.8 16.7 66.2-0.8 71.6-19.6 72.6-35.6 65.6-51.6 58.6-64.8 43.6-71.6 26.4-78.4 9.2-78.8-10.2-72.2-26.5-65.6-42.8-52-56-36-64.7-20-73.4-1.6-77.6 15.8-72.9 33.2-68.2 35.1-70.2 48.7-58.8Z"
          transform="translate(100 100)"
        />
      </svg>
      <svg
        className="floaty absolute bottom-16 left-[7%] h-10 w-10 text-sun"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="#2c2147"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="m12 2 2.9 6.2 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 21l1.3-6.7-5-4.6 6.8-.8L12 2Z" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <span className="chip inline-block bg-white px-4 py-1.5 text-[13px] font-bold text-ink">
            The rules 📕
          </span>
          <h2 className="font-display mt-4 text-balance text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.04]">
            Instagram Giveaway Rules You Must Follow
          </h2>
          <p className="mt-4 text-[16.5px] font-medium leading-relaxed text-white/90">
            Every Instagram giveaway must follow platform guidelines to keep your
            account safe. Here are the essentials:
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {rules.map((rule, i) => (
            <div
              key={rule}
              className="pop flex h-full gap-4 rounded-3xl bg-white/10 p-5 backdrop-blur-sm"
            >
              <span className="pop grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sun font-display text-lg font-bold text-ink">
                {i + 1}
              </span>
              <span className="text-[15px] font-semibold leading-relaxed text-white">
                {rule}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
