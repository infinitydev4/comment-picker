'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Is CommentPickers Free to Use?',
    a: 'Yes, completely free. No hidden fees, no premium paywalls, no credit card required. Every feature — including filters and multiple winner selection — is available at no cost.',
    bg: 'bg-sky/15',
  },
  {
    q: 'Do I Need to Log In to Use CommentPickers?',
    a: 'No. The tool works as a completely free Instagram comment picker without login. Simply paste your post URL and start your draw immediately — making it the fastest Instagram giveaway picker available.',
    bg: 'bg-white',
  },
  {
    q: 'Does CommentPickers Work with Instagram Reels?',
    a: 'Yes, fully. Whether your Instagram contest lives on your feed or went viral as a Reel, picking a fair random winner takes seconds.',
    bg: 'bg-white',
  },
  {
    q: 'Can I Pick Multiple Winners?',
    a: 'Absolutely. Set your desired winner count before running the draw and the tool randomly selects all winners simultaneously — perfect for giveaways with multiple prizes.',
    bg: 'bg-white',
  },
  {
    q: 'How Do I Filter Spam Comments?',
    a: 'Enable the keyword filter before picking. This ensures only comments that meet your entry rules are included in the final Instagram giveaway winner draw.',
    bg: 'bg-white',
  },
]

export function FaqSection() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-20 sm:py-28">
      <div className="text-center">
        <span className="chip inline-block bg-bubble px-4 py-1.5 text-[13px] font-bold text-ink">
          Questions 💬
        </span>
        <h2 className="font-display mx-auto mt-4 max-w-2xl text-balance text-[clamp(1.9rem,4.4vw,3.2rem)] font-bold leading-[1.04] text-ink">
          Frequently Asked Questions About Instagram Comment Picker
        </h2>
      </div>

      <div className="mt-12 space-y-4">
        {faqs.map((faq, i) => {
          const isOpen = open === i
          return (
            <div
              key={faq.q}
              className={`pop overflow-hidden rounded-[26px] ${faq.bg}`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
              >
                <span className="font-display flex-1 text-[clamp(1.1rem,2.2vw,1.45rem)] font-bold leading-snug text-ink">
                  {faq.q}
                </span>
                <span
                  className={`pop grid h-9 w-9 shrink-0 place-items-center rounded-full text-xl font-bold transition ${
                    isOpen
                      ? 'rotate-45 bg-bubble text-ink'
                      : 'bg-sun text-ink'
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              {isOpen && (
                <p className="px-5 pb-6 text-[15.5px] font-medium leading-relaxed text-ink-soft sm:px-6">
                  {faq.a}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
