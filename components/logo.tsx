type LogoProps = {
  className?: string
  iconSize?: number
  textSize?: string
}

export function LogoMark({
  size = 36,
  rounded = 'rounded-2xl',
}: {
  size?: number
  rounded?: string
}) {
  return (
    <span
      className={`pop grid place-items-center bg-bubble text-white ${rounded}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="#fff"
        aria-hidden="true"
      >
        <path d="M12 0c.6 6 5.4 10.8 11.4 11.4v1.2C17.4 13.2 12.6 18 12 24c-.6-6-5.4-10.8-11.4-11.4v-1.2C6.6 10.8 11.4 6 12 0Z" />
      </svg>
    </span>
  )
}

export function Logo({
  className,
  iconSize = 36,
  textSize = 'text-[20px]',
}: LogoProps) {
  const rounded = iconSize <= 32 ? 'rounded-xl' : 'rounded-2xl'

  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ''}`}>
      <LogoMark size={iconSize} rounded={rounded} />
      <span
        className={`font-display ${textSize} font-bold tracking-tight text-ink`}
      >
        Comment<span className="text-bubble">Pickers</span>
      </span>
    </span>
  )
}
