import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import { ProtectedRoute } from './components/ProtectedRoute';

// Basic dashboard placeholder for the consumer
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p className="text-body-text">Your bookings and saved trips will appear here.</p>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route - The main landing page */}
        <Route path="/" element={<Home />} />
        
        {/* Protected Dashboard Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
