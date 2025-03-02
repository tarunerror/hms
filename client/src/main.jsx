import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Import CSS files for components and pages
import './components/Navbar.css'
import './pages/Home.css'
import './pages/HospitalList.css'
import './pages/HospitalDetails.css'
import './pages/CreateHospital.css'
import './pages/EditHospital.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
