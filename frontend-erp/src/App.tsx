import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfileDashboard from './features/profile/ProfileDashboard';

const CalendarSetup = () => <div>Calendar Setup</div>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<ProfileDashboard />} />
          <Route path="/calendar" element={<CalendarSetup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
