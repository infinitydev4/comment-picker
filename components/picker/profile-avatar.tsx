'use client'

import { useEffect, useState } from 'react'

const GRADIENTS = [
  ['#4f5bd5', '#962fbf'],
  ['#962fbf', '#d62976'],
  ['#d62976', '#fa7e1e'],
  ['#fa7e1e', '#feda75'],
  ['#e0156d', '#fa7e1e'],
  ['#4f5bd5', '#d62976'],
] as const

function avatarStyle(username: string) {
  let hash = 0
  for (let i = 0; i < username.length; i++) {
    hash = (Math.imul(31, hash) + username.charCodeAt(i)) >>> 0
  }
  const [from, to] = GRADIENTS[hash % GRADIENTS.length]
  const initials = username.replace(/[^a-z]/gi, '').slice(0, 2).toUpperCase()
  return {
    gradient: `linear-gradient(135deg, ${from}, ${to})`,
    initials: initials || '?',
  }
}

export function ProfileAvatar({
  username,
  src,
  size = 40,
  ring = false,
}: {
  username: string
  src?: string
  size?: number
  ring?: boolean
}) {
  const { gradient, initials } = avatarStyle(username)
  const [failedSrc, setFailedSrc] = useState<string>()

  useEffect(() => {
    setFailedSrc(undefined)
  }, [src])

  const showImage = src && src !== failedSrc

  return (
    <span
      className="relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full font-mono font-semibold text-white"
      style={{
        width: size,
        height: size,
        background: gradient,
        fontSize: size * 0.34,
        boxShadow: ring ? '0 0 0 2px var(--color-cream)' : undefined,
      }}
      aria-hidden="true"
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        initials
      )}
    </span>
  )
}
