import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// All your page imports
import HomePage from "@/pages/HomePage"
import LabsPage from "@/pages/LabsPage"
import ConsultingPage from "@/pages/ConsultingPage"
import PolicyPage from "@/pages/PolicyPage"
import ImpactLedgerPage from "@/pages/ImpactLedgerPage"
import DataIntegrationPage from "@/pages/DataIntegrationPage"
import RipplesPage from "@/pages/RipplesPage"
import CreativeEyesDemo from "@/pages/CreativeEyesDemo"

// Your UI component import
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    // This is the correct wrapper for browser-based routing
    <BrowserRouter>
    
      {/* This component is the modern (v6+) way to group routes */}
      <Routes>
        {/* Each route is correctly defined with a path and an element */}
        <Route path="/" element={<HomePage />} />
        <Route path="/labs" element={<LabsPage />} />
        <Route path="/consulting" element={<ConsultingPage />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/impact-ledger" element={<ImpactLedgerPage />} />
        <Route path="/data-integration" element={<DataIntegrationPage />} />
        <Route path="/ripples" element={<RipplesPage />} />
        <Route path="/creative-eyes" element={<CreativeEyesDemo />} />
      </Routes>
      
      {/* This is also perfectly fine. The Toaster component is
        placed inside the Router, so it will be present on all pages.
      */}
      <Toaster 
        position="bottom-right"
        closeButton
        richColors
      />
    </BrowserRouter>
  )
}

export default App
