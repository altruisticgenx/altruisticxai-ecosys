import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "@/pages/HomePage"
import LabsPage from "@/pages/LabsPage"
import ConsultingPage from "@/pages/ConsultingPage"
import PolicyPage from "@/pages/PolicyPage"
import ImpactLedgerPage from "@/pages/ImpactLedgerPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/labs" element={<LabsPage />} />
        <Route path="/consulting" element={<ConsultingPage />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/impact-ledger" element={<ImpactLedgerPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App