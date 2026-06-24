export function SectionLabel({
  children,
  color = 'bg-sun',
}: {
  children: React.ReactNode
  color?: string
}) {
  return (
    <span
      className={`inline-block rounded-full border-[3px] border-ink px-4 py-1.5 font-heading text-sm font-600 text-ink shadow-brutal-sm ${color}`}
    >
      {children}
    </span>
  )
}
