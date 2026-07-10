import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import { ProtectedRoute } from './components/ProtectedRoute';
import HomestayView from './pages/HomestayView';
import StayDetailPage from './pages/StayDetailPage';
import PlaceDetailPage from './pages/PlaceDetailPage';
import FoodCulturePage from './pages/FoodCulturePage';
import FoodItemDetailPage from './pages/FoodItemDetailPage';
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

        {/* Public Routes - Detailed parallax pages for other categories */}
        <Route path="/cafe/:id" element={<PlaceDetailPage type="cafes" />} />
        <Route path="/experience/:id" element={<PlaceDetailPage type="attractions" />} />
        <Route path="/offbeat/:id" element={<PlaceDetailPage type="offbeat" />} />
        <Route path="/food-culture" element={<FoodCulturePage />} />
        <Route path="/food-culture/:slug" element={<FoodItemDetailPage />} />
        
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
