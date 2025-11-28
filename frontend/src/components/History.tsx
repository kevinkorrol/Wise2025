import type { KeyboardEvent } from 'react'

type HistoryProps = {
  isOpen: boolean
  onToggle: () => void
  name: string
  date: string
}

export default function History({ isOpen, onToggle, name, date }: HistoryProps) {
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') onToggle()
  }

  const displayDate = new Date(date).toLocaleString()

  return (
    <div
      className="history-card"
      role="button"
      aria-pressed={isOpen}
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={onKeyDown}
    >
      <div>
        <strong>{name}</strong>
        <div className="muted">{displayDate}</div>
      </div>
    </div>
  )
}
