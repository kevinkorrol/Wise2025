import './layout.css'
import Header from './Header'
import Sidebar from './Sidebar'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app-layout">
      <Header />
      <Sidebar />
      <main className="app-content">{children}</main>
    </div>
  )
}
