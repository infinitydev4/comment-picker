import { Logo } from './logo'

const navLinks = [
  { label: 'The Tool', href: '#picker' },
  { label: 'How', href: '#how' },
  { label: 'Giveaways', href: '#fair' },
  { label: 'Rules', href: '#rules' },
  { label: 'FAQ', href: '#faq' },
]

export function SiteHeader() {
  return (
    <header className="relative z-40">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between gap-4 px-4">
        <a href="#top" className="group flex items-center gap-2" aria-label="CommentPickers home">
          <Logo iconSize={36} />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-[15px] font-bold text-ink transition hover:bg-ink hover:text-cream"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#picker"
          className="pop pop-press rounded-full bg-sun px-5 py-2.5 text-[15px] font-bold text-ink"
        >
          Pick a winner ✦
        </a>
      </div>
    </header>
  )
}
