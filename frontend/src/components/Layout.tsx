import './layout.css'
import Header from './Header'
import Sidebar from './Sidebar'
import History from './History'
import Tracking from './Tracking'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

type TransactionData = {
  id: string
  name: string
  date: string
  from: string
  to: string
  amount: string
  statuses: string[]
  currentIndex: number
}

const FALLBACK: TransactionData = {
  id: 'txn_fallback',
  name: 'Payment: Test 1',
  date: new Date().toISOString(),
  from: 'EE123',
  to: 'EE456',
  amount: '100$',
  statuses: ['Confirmed', 'Gathering pool', 'Preparing to send', 'Sent'],
  currentIndex: 2,
}

export default function Layout({ children }: { children: ReactNode }) {
  const [showTracking, setShowTracking] = useState(true)
  const [txn, setTxn] = useState<TransactionData>(FALLBACK)

  useEffect(() => {
    let cancelled = false
    fetch('/mock/transaction.json')
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return (await r.json()) as TransactionData
      })
      .then((json) => {
        if (!cancelled) setTxn(json)
      })
      .catch(() => {
        /* keep FALLBACK */
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="app-layout">
      <Header />
      <Sidebar />
      <main className="app-content">
        <History
          isOpen={showTracking}
          onToggle={() => setShowTracking((v) => !v)}
          name={txn.name}
          date={txn.date}
        />
        {showTracking && (
          <Tracking
            from={txn.from}
            to={txn.to}
            amount={txn.amount}
            statuses={txn.statuses}
            currentIndex={txn.currentIndex}
          />
        )}
        {children}
      </main>
    </div>
  )
}
