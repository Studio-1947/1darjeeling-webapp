import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import { ProtectedRoute } from './components/ProtectedRoute';
import HomestayView from './pages/HomestayView';
import StayDetailPage from './pages/StayDetailPage';
import ProviderPortal from './pages/ProviderPortal';

import Dashboard from './pages/Dashboard';

import AdminPortal from './pages/AdminPortal';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route - The main landing page */}
        <Route path="/" element={<Home />} />
        
        {/* Public Route - Homestay View */}
        <Route path="/homestay/:id" element={<HomestayView />} />

        {/* Public Route - Detailed Stay View */}
        <Route path="/stay/:id" element={<StayDetailPage />} />
        
        {/* Public Route - Provider Registration */}
        <Route path="/partner" element={<ProviderPortal />} />
        
        {/* Hidden Admin Route */}
        <Route path="/admin" element={<AdminPortal />} />
        
        {/* Protected Dashboard Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
