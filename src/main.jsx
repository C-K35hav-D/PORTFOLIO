import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import PulsarProject from './pages/PulsarProject.jsx'
import Project2Page from './pages/Project2.jsx'
import Project3Page from './pages/Project3.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/PORTFOLIO">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/project/1" element={<PulsarProject />} />
        <Route path="/project/2" element={<Project2Page />} />
        <Route path="/project/3" element={<Project3Page />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)