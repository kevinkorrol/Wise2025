import wiseLogo from '../assets/wise_logo.svg'

export default function Header() {
  return (
    <header className="app-header">
      <img src={wiseLogo} alt="Wise" className="logo" />
      <div className="spacer" />
      <div className="app-user" aria-label="Current user">
        <div className="app-avatar" aria-hidden>
          WG
        </div>
        <span className="user-name">WiseGuys</span>
      </div>
    </header>
  )
}
