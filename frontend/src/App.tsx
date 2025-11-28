import { Routes, Route } from 'react-router-dom'
import './App.css'
import Transfer from "./pages/Transfer"
import CalculateFee from './components/calculateFee2'
import Account from './pages/Account'
import Home from "./pages/Home"


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<Account />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/calculate" element={<CalculateFee />} />
        {/* optional: catch-all */}
        <Route path="*" element={<Account />} />
      </Routes>
    </>
  )
}

export default App
