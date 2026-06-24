'use client'

import { useEffect } from 'react'
import { CONFETTI_COLORS, GATHERING_USERNAMES, type CommentEntry } from '@/lib/picker-data'
import { ProfileAvatar } from './profile-avatar'

function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0c.6 6 5.4 10.8 11.4 11.4v1.2C17.4 13.2 12.6 18 12 24c-.6-6-5.4-10.8-11.4-11.4v-1.2C6.6 10.8 11.4 6 12 0Z" />
    </svg>
  )
}

function Star({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="#2c2147"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="m12 2 2.9 6.2 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 21l1.3-6.7-5-4.6 6.8-.8L12 2Z" />
    </svg>
  )
}

function fireConfetti() {
  import('canvas-confetti').then(({ default: confetti }) => {
    const burst = (x: number) =>
      confetti({
        particleCount: 80,
        spread: 80,
        startVelocity: 50,
        origin: { x, y: 0.42 },
        colors: CONFETTI_COLORS,
        scalar: 1.1,
        ticks: 240,
      })

    burst(0.3)
    window.setTimeout(() => burst(0.7), 150)
    window.setTimeout(
      () =>
        confetti({
          particleCount: 120,
          spread: 120,
          startVelocity: 40,
          origin: { x: 0.5, y: 0.4 },
          colors: CONFETTI_COLORS,
          scalar: 1.3,
          ticks: 280,
          shapes: ['circle', 'square', 'star'],
        }),
      300,
    )
  })
}

export function DrawStates({
  phase,
  winners,
  spinEntry,
  spinKey,
  onReset,
}: {
  phase: 'fetching' | 'spinning' | 'done'
  winners: CommentEntry[]
  spinEntry: CommentEntry
  spinKey: number
  onReset: () => void
}) {
  useEffect(() => {
    if (phase !== 'done') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    fireConfetti()
  }, [phase])

  return (
    <div className="animate-[pop-in_0.5s_var(--ease-bounce)_both]">
      <div className="relative mx-auto grid min-h-[280px] max-w-md place-items-center px-1 py-2 text-center">
        <Star className="floaty absolute -left-2 -top-1 h-9 w-9 text-sun" />
        <Sparkle className="floaty-slow absolute -right-1 -top-1 h-7 w-7 text-bubble" />

        <div className="w-full">
          {phase === 'fetching' && (
            <>
              <p className="font-display text-[15px] font-bold uppercase tracking-wide text-grape">
                🎟️ gathering the entries
              </p>
              <div className="mt-6 flex items-end justify-center gap-2">
                {GATHERING_USERNAMES.map((username, index) => (
                  <div
                    key={username}
                    className="animate-[gather-bounce_0.7s_ease-in-out_infinite]"
                    style={{ animationDelay: `${index * 0.12}s` }}
                  >
                    <ProfileAvatar
                      username={username}
                      size={index === 2 || index === 3 ? 48 : 38}
                      ring
                    />
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[14px] font-bold text-ink-soft">
                Reading the comments…
              </p>
            </>
          )}

          {phase === 'spinning' && (
            <>
              <p className="font-display text-[15px] font-bold uppercase tracking-wide text-grape">
                🎰 spinning the wheel
              </p>
              <div className="mt-5 flex flex-col items-center gap-3">
                <ProfileAvatar
                  username={spinEntry.username}
                  src={spinEntry.profilePic}
                  size={74}
                  ring
                />
                <p className="reel-blur font-display text-3xl font-bold text-ink">
                  @{spinEntry.username}
                </p>
              </div>
              <div className="pop mx-auto mt-6 h-4 w-48 overflow-hidden rounded-full bg-cream">
                <div key={spinKey} className="spin-progress h-full bg-bubble" />
              </div>
            </>
          )}

          {phase === 'done' && (
            <>
              <p className="font-display text-[16px] font-bold uppercase tracking-wide text-bubble">
                🎉 {winners.length > 1 ? 'we have winners!' : 'we have a winner!'}
              </p>
              <div className="mt-5 space-y-3">
                {winners.map((winner, index) => (
                  <div
                    key={winner.id}
                    className="pop flex items-start gap-3 rounded-3xl bg-sun/40 p-3 text-left"
                    style={{
                      animation: 'pop-in 0.5s var(--ease-bounce) both',
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <ProfileAvatar
                      username={winner.username}
                      src={winner.profilePic}
                      size={52}
                      ring
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-xl font-bold text-ink">
                        @{winner.username}
                      </p>
                      <p className="line-clamp-4 break-words text-[13px] font-medium leading-snug text-ink-soft">
                        {winner.text}
                      </p>
                    </div>
                    {winners.length > 1 && (
                      <span className="chip mt-0.5 shrink-0 bg-white px-2 py-0.5 text-[12px] font-bold text-ink">
                        #{index + 1}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={onReset}
                  className="pop pop-press w-full rounded-2xl bg-lime px-4 py-3 font-display text-[15px] font-bold text-ink"
                >
                  New post
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
