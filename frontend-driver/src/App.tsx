import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/Login';

const Dashboard = () => (
  <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
    <div className="bg-orange-600 text-white p-6 shadow-md">
      <h1 className="text-2xl font-bold">Driver Dashboard</h1>
    </div>
    <div className="p-6 flex-1 flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4 border-4 border-green-500">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-green-600">
          <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
        </svg>
      </div>
      <h2 className="text-2xl font-extrabold text-slate-800">You're Online!</h2>
      <p className="text-slate-500 text-lg mt-2 font-medium">Waiting for ride requests...</p>
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
