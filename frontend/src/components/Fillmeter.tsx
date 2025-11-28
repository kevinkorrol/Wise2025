type Currency = 'EUR' | 'DOLLAR'

export type FillmeterProps = {
  id?: number
  currentAmount?: { sum: number; currency: Currency }
  minimumAmount?: { sum: number; currency: Currency }
  targetCurrency?: Currency
  startTime?: string | Date
}

import { useEffect, useState } from 'react'
import { getPool } from '../api/transferApi';


export default function Fillmeter(props: FillmeterProps) {
  const [data, setData] = useState<{
    id: number
    currentAmount: { sum: number; currency: Currency }
    minimumAmount: { sum: number; currency: Currency }
    targetCurrency: Currency
    startTime: string
    estimatedCompletion?: string
  } | null>(props.currentAmount && props.minimumAmount && props.targetCurrency && props.startTime ? {
    id: props.id ?? 0,
    currentAmount: props.currentAmount!,
    minimumAmount: props.minimumAmount!,
    targetCurrency: props.targetCurrency!,
    startTime: typeof props.startTime === 'string' ? props.startTime : (props.startTime as Date).toISOString(),
  } : null)

  useEffect(() => {
    if (data) return;
    let cancelled = false;
    (async () => {
      try {
        console.log("Here")
        const json = await getPool()
        console.log('getPool resolved', json)
        if (cancelled) return
      } catch (err) {
      console.error('getPool rejected', err)
      if (cancelled) return
      }})()

   getPool().then((json) => {
    console.log(json)
        if (cancelled) return
        setData({
          id: json.ID,
          currentAmount: { sum: json.CurrentAmount.Sum, currency: json.CurrentAmount.Currency },
          minimumAmount: { sum: json.MinimumAmount.Sum, currency: json.MinimumAmount.Currency },
          targetCurrency: json.TargetCurrency,
          startTime: json.StartTime,
          estimatedCompletion: "2025-11-30T10:30:00Z",
        })
      })
      .catch(() => {
        if (cancelled) return
        setData({
          id: 0,
          currentAmount: { sum: 65000, currency: 'EUR' },
          minimumAmount: { sum: 100000, currency: 'EUR' },
          targetCurrency: 'EUR',
          startTime: new Date().toISOString(),
          estimatedCompletion: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
        })
      })
    return () => { cancelled = true }
  }, [data])

  const min = Math.max(0, data?.minimumAmount.sum ?? 0)
  const cur = Math.max(0, data?.currentAmount.sum ?? 0)
  const pct = min > 0 ? Math.min(100, Math.round((cur / min) * 100)) : 0
  const started = new Date(data?.startTime ?? '')
  const startedLabel = isNaN(started.getTime()) ? '' : started.toLocaleString()
  const estimated = new Date(data?.estimatedCompletion ?? '')
  const estimatedLabel = isNaN(estimated.getTime()) ? '' : estimated.toLocaleString()

  return (
    <div className="fillmeter" aria-label="Pool progress">
      <div className="fillmeter-header">
        <strong>Pool Progress</strong>
        {data && (
          <span className="muted">Target: {data.minimumAmount.sum.toLocaleString()} {data.targetCurrency}</span>
        )}
      </div>
      <div className="fillmeter-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="fillmeter-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="fillmeter-stats">
        {data && (
          <span className="muted fillmeter-current">Current: {cur.toLocaleString()} {data.currentAmount.currency}</span>
        )}
        <div style={{ textAlign: 'right' }}>
          {startedLabel && <div className="muted">Started: {startedLabel}</div>}
          {estimatedLabel && <div className="muted">Estimation: {estimatedLabel}</div>}
        </div>
      </div>
    </div>
  )
}
