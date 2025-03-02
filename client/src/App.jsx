import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import HospitalList from './pages/HospitalList'
import HospitalDetails from './pages/HospitalDetails'
import CreateHospital from './pages/CreateHospital'
import EditHospital from './pages/EditHospital'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hospitals" element={<HospitalList />} />
          <Route path="/hospitals/:id" element={<HospitalDetails />} />
          <Route path="/create-hospital" element={<CreateHospital />} />
          <Route path="/edit-hospital/:id" element={<EditHospital />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
