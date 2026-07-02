import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/Login';

const Dashboard = () => (
  <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center">
    <h1 className="text-3xl font-bold">Partner Dashboard</h1>
  </div>
);

const CalendarSetup = () => <div>Calendar Setup</div>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/calendar" element={<CalendarSetup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
