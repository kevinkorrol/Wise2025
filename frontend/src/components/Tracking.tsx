import Fillmeter from './Fillmeter'

type TrackingProps = {
  from: string
  to: string
  amount: string
  statuses: string[]
  currentIndex: number
}

export default function Tracking({ from, to, amount, statuses, currentIndex }: TrackingProps) {
  const formatParty = (value: string) => {
    if (!value) return value
    // Insert a space between number and following letters (e.g., "EE123John" -> "EE123 John")
    // but keep prefixes like "EE123" together.
    const withSpaces = value.replace(/(\d)([A-Za-z])/g, '$1 $2')
    return withSpaces
  }
  return (
    <div className="tracking-panel">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
      </div>
        <div style={{ display: 'flex', gap: 32 }}>
          <div className="timeline" aria-label="Payment progression">
          {statuses.map((status, idx) => {
            const state = idx < currentIndex ? 'completed' : idx === currentIndex ? 'current' : 'upcoming'
              const isGatheringPoolCurrent = status === 'Gathering pool' && idx === currentIndex
              return (
                <>
                  <div key={status} className={`timeline-step timeline-step--${state}`}>
                    <span className="timeline-dot" aria-hidden />
                    <span className="timeline-label">{status}</span>
                  </div>
                  {isGatheringPoolCurrent && (
                    <div className="timeline-insert" key={`${status}-fillmeter`}>
                      <Fillmeter />
                    </div>
                  )}
                </>
              )
          })}
        </div>
          <div style={{ flex: '0 0 260px', marginLeft: 'auto' }}>
            <p className="muted" style={{ margin: '4px 0' }}>Sent from:</p>
            <p className="tracking-value" style={{ margin: '2px 0 8px', wordBreak: 'break-word' }}>{formatParty(from)}</p>
            <p className="muted" style={{ margin: '4px 0' }}>Sent to:</p>
            <p className="tracking-value" style={{ margin: '2px 0', wordBreak: 'break-word' }}>{formatParty(to)}</p>
            <p className="muted" style={{ margin: '8px 0 2px' }}>Amount:</p>
            <p className="tracking-value" style={{ margin: '2px 0' }}>{amount}</p>
          </div>
      </div>    
      <div className="btn-stack" style={{ marginTop: 12 }}>
        <button
          type="button"
          className="btn btn-info"
          aria-label="Bypass queue"
          title="Bypass queue"
        >
          Send now (extra fees may apply)
        </button>
        <button
          type="button"
          className="btn btn-danger"
          aria-label="Cancel transaction"
          title="Cancel transaction"
        >
          Cancel Transfer
        </button>
      </div>
    </div>
  )
}

