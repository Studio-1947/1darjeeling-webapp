import { useAuthStore } from '../store/authStore';
import { useDriverProfile } from '../hooks/useDriverProfile';
import { DriverDetails } from '@darjeeling/shared';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { data, loading, error, isEditing, setIsEditing, saving, form, setForm, handleSave } = useDriverProfile();
  const clearAuth = useAuthStore(state => state.clearAuth);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-orange-500 font-medium text-lg">Loading Profile...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-red-500 font-medium text-lg">Error loading profile.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      {/* Navbar */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Driver Portal</h1>
          <button 
            onClick={handleLogout}
            className="text-slate-400 hover:text-white font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto w-full px-6 py-10 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Left Col - Status */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-xl flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border-4 border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-green-500">
                <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-100">You're Online!</h2>
            <p className="text-slate-400 mt-2 font-medium">Waiting for ride requests...</p>
          </div>
        </div>

        {/* Right Col - Profile Setup */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 backdrop-blur-md shadow-xl relative overflow-hidden">
            <h2 className="text-xl font-bold mb-2">Welcome back, {data.fullName}!</h2>
            <p className="text-slate-400 text-sm">Keep your profile updated to attract more customers.</p>
          </div>
          
          <DriverDetails
            email={data.email}
            licenseNumber={data.licenseNumber}
            vehicleType={data.vehicleType}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            saving={saving}
            handleSave={handleSave}
            error={error}
            form={form}
            setForm={setForm}
          />
        </div>
        
      </div>
    </div>
  );
}
