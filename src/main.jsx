import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import PulsarProject from './pages/PulsarProject.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/PORTFOLIO">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/project/1" element={<PulsarProject />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)