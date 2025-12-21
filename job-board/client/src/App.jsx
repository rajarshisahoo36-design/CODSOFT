import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Pages
import LandingZone from './pages/LandingZone';
import GigBoard from './pages/GigBoard';
import ScoutDesk from './pages/ScoutDesk';
import JobDetail from './pages/JobDetail';
import Auth from './pages/Auth';
import Navigation from './components/Navigation';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<LandingZone />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/board" element={<GigBoard />} />
            <Route path="/board/:id" element={<JobDetail />} />
            <Route path="/dashboard" element={<ScoutDesk />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;