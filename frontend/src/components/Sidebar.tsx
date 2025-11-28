import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'

export default function Sidebar() {
  return (
    <aside className="app-sidebar">
      <nav>
        <Link to="/account">
          <Icon icon="mdi:home" width="18" />
          Home
        </Link>
        <Link to="/money">
          <Icon icon="mdi:cash-multiple" width="18" />
          Money
        </Link>
        <Link to="/">
          <Icon icon="mdi:credit-card-outline" width="18" />
          Cards
        </Link>
        <Link to="/">
          <Icon icon="mdi:swap-horizontal" width="18" />
          Transactions
        </Link>
        <Link to="/">
          <Icon icon="mdi:send" width="18" />
          Payments
        </Link>
        <Link to="/">
          <Icon icon="mdi:account-multiple-outline" width="18" />
          Recipients
        </Link>
        <Link to="/">
          <Icon icon="mdi:chart-line" width="18" />
          Insights
        </Link>
        {/* Add more links as your app grows */}
      </nav>
    </aside>
  )
}
