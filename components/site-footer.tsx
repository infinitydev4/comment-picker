import Image from 'next/image'
import { Logo } from './logo'

const footerLinks = [
  { label: 'How', href: '#how' },
  { label: 'Giveaways', href: '#fair' },
  { label: 'Rules', href: '#rules' },
  { label: 'FAQ', href: '#faq' },
]

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-4 pb-10">
      <div className="pop-lg relative isolate overflow-hidden rounded-[40px] bg-grape px-6 py-20 text-center sm:py-24">
        <Image
          src="/photos/celebrate.webp"
          alt=""
          aria-hidden="true"
          fill
          className="-z-10 object-cover opacity-25 mix-blend-luminosity"
          sizes="100vw"
        />
        <svg
          className="floaty-slow absolute -left-10 -top-8 h-44 w-44 text-white/20"
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
          className="floaty absolute right-[10%] top-10 h-12 w-12 text-sun"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="#2c2147"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="m12 2 2.9 6.2 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 21l1.3-6.7-5-4.6 6.8-.8L12 2Z" />
        </svg>
        <svg
          className="floaty-slow absolute bottom-10 left-[12%] h-10 w-10 text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 0c.6 6 5.4 10.8 11.4 11.4v1.2C17.4 13.2 12.6 18 12 24c-.6-6-5.4-10.8-11.4-11.4v-1.2C6.6 10.8 11.4 6 12 0Z" />
        </svg>

        <span className="chip relative inline-block bg-white px-4 py-1.5 text-[13px] font-bold text-ink">
          One more thing ✨
        </span>
        <h2 className="font-display relative mx-auto mt-4 max-w-2xl text-balance text-[clamp(2.2rem,5.5vw,4.2rem)] font-bold leading-[0.98] text-white">
          Your next winner is one paste away.
        </h2>
        <p className="relative mx-auto mt-4 max-w-md text-[17px] font-semibold text-white/90">
          No login. No sign-up. Just a fair, verifiable draw — completely free.
        </p>
        <a
          href="#picker"
          className="pop pop-press relative mt-8 inline-block rounded-full bg-white px-7 py-4 font-display text-[16px] font-bold text-ink"
        >
          Pick a winner now 🎉
        </a>
      </div>

      <div className="mt-10 flex flex-col items-center justify-between gap-5 sm:flex-row">
        <a href="#top" aria-label="CommentPickers home">
          <Logo iconSize={32} textSize="text-[18px]" />
        </a>
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-2">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-[14px] font-bold text-ink transition hover:bg-ink hover:text-cream"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <p className="mx-auto mt-7 max-w-2xl text-center text-[12px] font-semibold leading-relaxed text-ink-soft">
        CommentPickers is an independent giveaway tool. This promotion is not
        sponsored, endorsed, administered by, or associated with Instagram or
        Meta. © 2026 CommentPickers.
      </p>
    </footer>
  )
}
