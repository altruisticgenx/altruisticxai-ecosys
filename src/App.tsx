import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import HomePage from "@/pages/HomePage"
import LabsPage from "@/pages/LabsPage"
import ConsultingPage from "@/pages/ConsultingPage"
import PolicyPage from "@/pages/PolicyPage"
import ImpactLedgerPage from "@/pages/ImpactLedgerPage"
import { Toaster } from "@/components/ui/sonner"
import { registerServiceWorker } from "@/lib/registerServiceWorker"

function App() {
  useEffect(() => {
    registerServiceWorker()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/labs" element={<LabsPage />} />
        <Route path="/consulting" element={<ConsultingPage />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/impact-ledger" element={<ImpactLedgerPage />} />
      </Routes>
      <Toaster 
        position="bottom-right"
        closeButton
        richColors
      />
    </BrowserRouter>
  )
}

export default App