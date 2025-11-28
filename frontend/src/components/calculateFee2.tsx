import { useState } from 'react'

type QuoteResponse = {
  id?: string
  sourceAmount?: number
  targetAmount?: number
  sourceCurrency?: string
  targetCurrency?: string
  rate?: number
  fee?: number | { total?: number }
  createdTime?: string
  payOut?: { fees?: { total?: number; variable?: number; fixed?: number } }
  price?: {
    priceSetId?: number
    total?: { value?: { amount?: number; currency?: string } }
    items?: Array<{ type?: string; value?: { amount?: number; currency?: string } }>
  }
  paymentOptions?: Array<{
    payIn?: string
    disabled?: boolean
    price?: { total?: { value?: { amount?: number; currency?: string } }; items?: Array<{ type?: string; value?: { amount?: number; currency?: string } }> }
    fee?: { total?: number; payIn?: number; transferwise?: number }
    feePercentage?: number
    sourceAmount?: number
    targetAmount?: number
  }>
  transferWiseCommission?: number
  guaranteedTargetAmount?: boolean
}

function extractWiseFee(q: QuoteResponse): { wiseFee?: number; currency?: string } {
  const optionWiseItems: Array<{ amount?: number; currency?: string }> = (q.paymentOptions ?? []).map((p) => {
    const items = p.price?.items
    const itemWise = items?.find((i) => i.type === 'TRANSFERWISE')
    return { amount: p.fee?.transferwise ?? itemWise?.value?.amount, currency: itemWise?.value?.currency ?? p.price?.total?.value?.currency }
  })
  const optionWiseAmounts = optionWiseItems.map((i) => i.amount).filter((a): a is number => typeof a === 'number')
  const minOptionWise = optionWiseAmounts.length ? Math.min(...optionWiseAmounts) : undefined
  const optionCurrency = optionWiseItems.find((i) => i.amount === minOptionWise)?.currency

  const topItems = q.price?.items
  const topWise = topItems?.find((i) => i.type === 'TRANSFERWISE')

  return {
    wiseFee: minOptionWise ?? topWise?.value?.amount,
    currency: optionCurrency ?? topWise?.value?.currency ?? q.price?.total?.value?.currency,
  }
}

export default function CalculateFee({ amount: propAmount }: { amount?: string | number }) {
  const SOURCE_CURRENCY = 'USD'
  const TARGET_CURRENCY = 'ZAR'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [quote, setQuote] = useState<QuoteResponse | null>(null)
  const [baselineQuote, setBaselineQuote] = useState<QuoteResponse | null>(null)
  const [baselineLoading, setBaselineLoading] = useState(false)
  const [baselineError, setBaselineError] = useState<string | null>(null)
  const [adjustedFee, setAdjustedFee] = useState<number | null>(null)

  async function fetchBaseline() {
    if (
      baselineQuote &&
      baselineQuote.sourceCurrency === SOURCE_CURRENCY &&
      baselineQuote.targetCurrency === TARGET_CURRENCY
    )
      return
    setBaselineError(null)
    setBaselineLoading(true)
    try {
      const token = import.meta.env.VITE_WISE_API_TOKEN as string | undefined
      const res = await fetch('/api/wise/v3/quotes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          sourceCurrency: SOURCE_CURRENCY,
          targetCurrency: TARGET_CURRENCY,
          sourceAmount: 22000,
        }),
      })
      if (!res.ok) {
        const body = await res.text()
        throw new Error(`Baseline HTTP ${res.status}: ${body}`)
      }
      const json = (await res.json()) as QuoteResponse
      console.log('Baseline quote (22000):', json)
      setBaselineQuote(json)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch baseline quote'
      setBaselineError(message)
    } finally {
      setBaselineLoading(false)
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setQuote(null)
    setAdjustedFee(null)
    const num = Number(propAmount)
    if (isNaN(num) || num <= 0) {
      setError('Please enter a positive amount in the Send Money form.')
      return
    }
    setLoading(true)
    try {
      const token = import.meta.env.VITE_WISE_API_TOKEN as string | undefined
      const res = await fetch('/api/wise/v3/quotes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          sourceCurrency: SOURCE_CURRENCY,
          targetCurrency: TARGET_CURRENCY,
          sourceAmount: num,
        }),
      })
      if (!res.ok) {
        const body = await res.text()
        throw new Error(`HTTP ${res.status}: ${body}`)
      }
      const json = (await res.json()) as QuoteResponse
      console.log('Quote response:', json)
      setQuote(json)
      fetchBaseline().catch(() => {})
      if (baselineQuote) {
        const baseline = extractWiseFee(baselineQuote)
        const current = extractWiseFee(json)
        if (baseline.wiseFee != null && current.wiseFee != null && num > 0) {
          setAdjustedFee(current.wiseFee - (num / 22000) * baseline.wiseFee)
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch quote'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const currentFee = quote ? extractWiseFee(quote) : null
  const savingsPct = adjustedFee != null && currentFee?.wiseFee && currentFee.wiseFee > 0
    ? (adjustedFee / currentFee.wiseFee) * 100
    : null

  return (
    <div style={{ maxWidth: 520 }}>
      <h2 style={{ marginBottom: 12, color: '#111827' }}>Calculate Transfer Fee With Pooling</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#111827' }}>
          <div style={{ fontWeight: 600 }}>From</div>
          <div>USD → ZAR</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#111827' }}>
          <div style={{ fontWeight: 600 }}>You send exactly</div>
          <div>{Number(propAmount || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD</div>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            fontWeight: 600,
            background: '#111827',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Calculating…' : 'Calculate savings'}
        </button>
      </form>

      {error && <div style={{ marginTop: 16, color: '#b91c1c' }}>{error}</div>}

      {quote && (
        <div style={{ marginTop: 20, padding: 16, border: '1px solid #e5e7eb', borderRadius: 10, background: '#fff', color: '#111827' }}>
          <h3 style={{ marginTop: 0 }}>Money Saved</h3>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>
            {adjustedFee != null ? adjustedFee.toFixed(2) : '—'} {currentFee?.currency ?? SOURCE_CURRENCY}
            {savingsPct != null && <span> ({savingsPct.toFixed(2)}%)</span>}
          </div>
          {adjustedFee == null && baselineQuote && !baselineLoading && (
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 8 }}>Press "Calculate savings" again to compute after baseline loads.</div>
          )}
          {baselineError && <div style={{ color: '#b45309', fontSize: 12, marginTop: 6 }}>Baseline error: {baselineError}</div>}
        </div>
      )}
    </div>
  )
}

/*
Usage notes:
- Create a .env file at project root with: VITE_WISE_API_TOKEN=your_sandbox_token_here
  Then restart dev server so Vite exposes it via import.meta.env.
*/
