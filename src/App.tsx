import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "@/pages/HomePage"
import LabsPage from "@/pages/LabsPage"
import ConsultingPage from "@/pages/ConsultingPage"
import PolicyPage from "@/pages/PolicyPage"
import ImpactLedgerPage from "@/pages/ImpactLedgerPage"
import DataIntegrationPage from "@/pages/DataIntegrationPage"
import RipplesPage from "@/pages/RipplesPage"
import CreativeEyesDemo from "@/pages/CreativeEyesDemo"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/labs" element={<LabsPage />} />
        <Route path="/consulting" element={<ConsultingPage />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/impact-ledger" element={<ImpactLedgerPage />} />
        <Route path="/data-integration" element={<DataIntegrationPage />} />
        <Route path="/ripples" element={<RipplesPage />} />
        <Route path="/creative-eyes" element={<CreativeEyesDemo />} />
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