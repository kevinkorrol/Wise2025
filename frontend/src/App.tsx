import { Routes, Route } from 'react-router-dom'
import './App.css'
import Money from './pages/Money'
import Account from './pages/Account'

function App() {
  return (
    <>

      <Routes>
        <Route path="/account" element={<Account />} />
        <Route path="/money" element={<Money />} />
        <Route path="/transfer" element={<Transfer />} />
        {/* optional: catch-all */}
        <Route path="*" element={<Account />} />
      </Routes>
    </>
  )
}

export default App
