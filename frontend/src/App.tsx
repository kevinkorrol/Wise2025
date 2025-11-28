import { Routes, Route } from 'react-router-dom'
import './App.css'
import Transfer from "./pages/Transfer"
import Account from './pages/Account'
import Home from "./pages/Home"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<Account />} />
        <Route path="/transfer" element={<Transfer />} />
        {/* optional: catch-all */}
        <Route path="*" element={<Account />} />
      </Routes>
    </>
  )
}

export default App
