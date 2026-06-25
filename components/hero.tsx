'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { DrawStates } from '@/components/picker/draw-states'
import { getFixedWinners, getRandomPoolEntry, type CommentEntry } from '@/lib/picker-data'

const DEMO_POST = {
  username: 'dirsouk.app',
  verified: true,
  caption:
    '🎁 Erba7 iPhone 17 Pro ! ✅ Téléchargi Dirsouk ✅ Follow Dirsouk sur TikTok et Instagram ✅ Tag 3 amis ✅ Republie la vidéo #dirsouk #iphone17promax #jeuconcours🎁 #algerie #fyp',
  likeCount: 6400,
  commentCount: 82800,
  thumbnail: '/photos/dirsouk-post.png',
  avatar: '/photos/dirsouk-avatar.svg',
}

type Status =
  | 'idle'
  | 'loadingPreview'
  | 'preview'
  | 'fetching'
  | 'spinning'
  | 'done'

function formatCount(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  }
  return String(value)
}

function BlobDecor({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <path
        fill="currentColor"
        d="M48.7-58.8C62.3-47.4 71.7-30.7 74-13.2 76.3 4.4 71.5 22.8 61 36.9 50.4 51 34.2 60.8 16.7 66.2-0.8 71.6-19.6 72.6-35.6 65.6-51.6 58.6-64.8 43.6-71.6 26.4-78.4 9.2-78.8-10.2-72.2-26.5-65.6-42.8-52-56-36-64.7-20-73.4-1.6-77.6 15.8-72.9 33.2-68.2 35.1-70.2 48.7-58.8Z"
        transform="translate(100 100)"
      />
    </svg>
  )
}

function StarDecor({
  className,
  stroke = false,
}: {
  className?: string
  stroke?: boolean
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke={stroke ? '#2c2147' : undefined}
      strokeWidth={stroke ? 1.5 : undefined}
      aria-hidden="true"
    >
      {stroke ? (
        <path d="m12 2 2.9 6.2 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 21l1.3-6.7-5-4.6 6.8-.8L12 2Z" />
      ) : (
        <path d="M12 0c.6 6 5.4 10.8 11.4 11.4v1.2C17.4 13.2 12.6 18 12 24c-.6-6-5.4-10.8-11.4-11.4v-1.2C6.6 10.8 11.4 6 12 0Z" />
      )}
    </svg>
  )
}

function StepperButton({
  label,
  onClick,
  disabled,
}: {
  label: string
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label === '+' ? 'increase winners' : 'decrease winners'}
      className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink text-xl font-bold text-ink transition hover:bg-sun/50 disabled:opacity-30"
    >
      {label}
    </button>
  )
}

export function Hero() {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [winnerCount, setWinnerCount] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [drawWinners, setDrawWinners] = useState<CommentEntry[]>([])
  const [spinEntry, setSpinEntry] = useState<CommentEntry>({
    id: 'spin',
    username: 'shuffling',
    text: '',
  })
  const [spinKey, setSpinKey] = useState(0)
  const drawCleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    return () => drawCleanupRef.current?.()
  }, [])

  function resetPicker() {
    drawCleanupRef.current?.()
    drawCleanupRef.current = null
    setStatus('idle')
    setUrl('')
    setWinnerCount(1)
    setError(null)
    setDrawWinners([])
    setSpinEntry({ id: 'spin', username: 'shuffling', text: '' })
  }

  function handlePreview(e?: React.FormEvent) {
    e?.preventDefault()
    const trimmed = url.trim()
    if (!/instagram\.com|instagr\.am/i.test(trimmed)) {
      setError('Paste a valid Instagram post or Reel link to continue.')
      return
    }

    setError(null)
    setStatus('loadingPreview')
    window.setTimeout(() => setStatus('preview'), 900)
  }

  function handlePickWinners() {
    setError(null)
    setDrawWinners([])

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reducedMotion) {
      setDrawWinners(getFixedWinners(winnerCount))
      setStatus('done')
      return
    }

    setStatus('fetching')

    const timers: number[] = []
    drawCleanupRef.current = () => {
      timers.forEach((timer) => window.clearTimeout(timer))
    }

    timers.push(
      window.setTimeout(() => {
        setStatus('spinning')
        setSpinKey((key) => key + 1)

        let elapsed = 0
        let delay = 50

        const spinStep = () => {
          const random = getRandomPoolEntry()
          if (random) setSpinEntry(random)

          delay = 50 + 220 * Math.pow(Math.min(elapsed / 2200, 1), 3)
          elapsed += delay

          if (elapsed < 2200) {
            timers.push(window.setTimeout(spinStep, delay))
          } else {
            const winners = getFixedWinners(winnerCount)
            setDrawWinners(winners)
            setSpinEntry(winners[0] ?? { id: 'spin', username: 'shuffling', text: '' })
            setStatus('done')
          }
        }

        timers.push(window.setTimeout(spinStep, delay))
      }, 1100),
    )
  }

  const isDrawPhase =
    status === 'fetching' || status === 'spinning' || status === 'done'

  return (
    <section id="top" className="relative overflow-hidden pt-8 sm:pt-12">
      <BlobDecor className="floaty-slow absolute -left-28 top-16 h-72 w-72 text-grape/15" />
      <BlobDecor className="floaty absolute -right-24 top-40 h-72 w-72 text-sky/15" />
      <StarDecor
        className="floaty absolute left-[5%] top-32 h-9 w-9 text-sun"
        stroke
      />
      <StarDecor
        className="floaty-slow absolute right-[6%] top-20 h-8 w-8 text-bubble"
      />
      <StarDecor
        className="floaty-slow absolute right-[14%] top-52 h-7 w-7 text-lime"
        stroke
      />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <span
            className="chip bg-lime px-3.5 py-1.5 text-[13px] font-bold text-ink"
            style={{ transform: 'rotate(-2deg)' }}
          >
            100% Free
          </span>
          <span
            className="chip bg-sky px-3.5 py-1.5 text-[13px] font-bold text-ink"
            style={{ transform: 'rotate(2deg)' }}
          >
            No login
          </span>
          <span
            className="chip bg-bubble px-3.5 py-1.5 text-[13px] font-bold text-ink"
            style={{ transform: 'rotate(-2deg)' }}
          >
            No sign-up
          </span>
        </div>

        <h1 className="font-display mx-auto mt-6 max-w-6xl text-center text-[clamp(1.9rem,5vw,3.9rem)] font-bold leading-[1.04] tracking-tight text-ink">
          <span className="block whitespace-normal sm:whitespace-nowrap">
            Free Instagram <span className="text-bubble">Comment Picker</span>
          </span>
          <span className="block">
            <span className="text-grape">And Giveaways</span> Tool
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-5xl text-pretty text-center text-[14px] font-medium leading-relaxed text-ink-soft sm:mt-6 sm:text-[17px]">
          Want to pick a fair winner from your Instagram comments instantly and
          for free?{' '}
          <strong className="font-bold text-ink">CommentPickers</strong> is the
          easiest{' '}
          <span className="rounded-md bg-sun/60 px-1 font-bold text-ink">
            free Instagram comment picker
          </span>{' '}
          built for creators, brands, and marketers who run{' '}
          <strong className="font-bold text-ink">Instagram giveaways</strong>,
          contests, and raffles. No login required, no sign-up needed. Just paste
          your post link and let the tool do the rest.
        </p>

        <div className="mt-12 sm:mt-14">
          <div
            id="picker"
            className="pop-card relative scroll-mt-24 rounded-[34px] bg-white"
          >
            <div className="flex items-center justify-between rounded-t-[31px] border-b-[3px] border-ink bg-grape px-6 py-4 text-white">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white">
                  <svg
                    className="h-5 w-5 text-grape"
                    viewBox="0 0 24 24"
                    fill="#7c3aed"
                    aria-hidden="true"
                  >
                    <path d="M12 0c.6 6 5.4 10.8 11.4 11.4v1.2C17.4 13.2 12.6 18 12 24c-.6-6-5.4-10.8-11.4-11.4v-1.2C6.6 10.8 11.4 6 12 0Z" />
                  </svg>
                </span>
                <div className="leading-tight">
                  <p className="font-display text-[18px] font-bold">
                    Winner Machine
                  </p>
                  <p className="text-[12px] font-semibold text-white/90">
                    Fair · random · unbiased
                  </p>
                </div>
              </div>
              <span className="chip hidden bg-white px-3 py-1 text-[12px] font-bold text-ink sm:block">
                free · no login
              </span>
            </div>

            <div className="p-6 sm:p-7">
              {(status === 'idle' || status === 'loadingPreview') && (
                <>
                  <form onSubmit={handlePreview}>
                    <label className="block">
                      <span className="font-display mb-2 block text-[15px] font-semibold text-ink">
                        Paste your Instagram link 🔗
                      </span>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => {
                            setUrl(e.target.value)
                            setError(null)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handlePreview()
                          }}
                          placeholder="instagram.com/p/your-post…"
                          inputMode="url"
                          aria-label="Instagram post or Reel URL"
                          className="pop w-full rounded-2xl bg-cream px-4 py-3.5 text-[16px] font-semibold text-ink outline-none transition placeholder:font-medium placeholder:text-ink-soft/60 focus:bg-sun/30"
                        />
                        <button
                          type="submit"
                          disabled={status === 'loadingPreview'}
                          className="pop pop-press shrink-0 rounded-2xl bg-sky px-6 py-3.5 font-display text-[16px] font-bold text-ink disabled:opacity-70"
                        >
                          {status === 'loadingPreview'
                            ? 'Loading…'
                            : 'Preview 🔍'}
                        </button>
                      </div>
                    </label>
                  </form>
                  <div className="mt-2.5">
                    {error ? (
                      <span className="text-[13px] font-bold text-bubble">
                        {error}
                      </span>
                    ) : (
                      <span className="text-[13px] font-semibold text-ink-soft">
                        Works with posts &amp; Reels
                      </span>
                    )}
                  </div>
                </>
              )}

              {status === 'preview' && (
                <div className="animate-[pop-in_0.5s_var(--ease-bounce)_both]">
                  <div className="pop flex gap-4 rounded-3xl bg-cream/60 p-3 sm:p-4">
                    <Image
                      src={DEMO_POST.thumbnail}
                      alt="Post thumbnail"
                      width={112}
                      height={112}
                      className="h-24 w-24 shrink-0 rounded-2xl border-2 border-ink object-cover sm:h-28 sm:w-28"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Image
                          src={DEMO_POST.avatar}
                          alt=""
                          width={24}
                          height={24}
                          className="h-6 w-6 rounded-full border border-ink object-cover"
                        />
                        <span className="truncate font-display text-[15px] font-bold text-ink">
                          @{DEMO_POST.username}
                        </span>
                        {DEMO_POST.verified && (
                          <span className="text-[13px] text-sky">✔︎</span>
                        )}
                      </div>
                      <p className="mt-1.5 line-clamp-3 text-[13px] font-medium leading-snug text-ink-soft">
                        {DEMO_POST.caption}
                      </p>
                      <div className="mt-2 flex gap-3 text-[12.5px] font-bold text-ink-soft">
                        <span>❤️ {formatCount(DEMO_POST.likeCount)}</span>
                        <span>💬 {formatCount(DEMO_POST.commentCount)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-2xl border-2 border-ink bg-white px-4 py-2.5">
                    <span className="font-display text-[15px] font-semibold text-ink">
                      Winners 🏆
                    </span>
                    <div className="flex items-center gap-1">
                      <StepperButton
                        label="−"
                        onClick={() =>
                          setWinnerCount((count) => Math.max(1, count - 1))
                        }
                        disabled={winnerCount <= 1}
                      />
                      <span className="font-display w-8 text-center text-xl font-bold text-ink">
                        {winnerCount}
                      </span>
                      <StepperButton
                        label="+"
                        onClick={() =>
                          setWinnerCount((count) => Math.min(5, count + 1))
                        }
                        disabled={winnerCount >= 5}
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="mt-2 text-[13px] font-bold text-bubble">
                      {error}
                    </p>
                  )}

                  <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                    <button
                      type="button"
                      onClick={handlePickWinners}
                      className="pop pop-press flex-1 rounded-2xl bg-bubble px-5 py-4 font-display text-[17px] font-bold text-ink"
                    >
                      Pick{' '}
                      {winnerCount > 1 ? `${winnerCount} winners` : 'a winner'}{' '}
                      🎉
                    </button>
                    <button
                      type="button"
                      onClick={resetPicker}
                      className="pop pop-press rounded-2xl bg-white px-5 py-4 font-display text-[15px] font-bold text-ink"
                    >
                      ← Another link
                    </button>
                  </div>
                </div>
              )}

              {isDrawPhase && (
                <DrawStates
                  phase={status as 'fetching' | 'spinning' | 'done'}
                  winners={drawWinners}
                  spinEntry={spinEntry}
                  spinKey={spinKey}
                  onReset={resetPicker}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
