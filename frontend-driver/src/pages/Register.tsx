import { useState } from 'react';
import { api } from '../api/client';
import { useAuthStore } from '../store/authStore';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/api/driver/register', { 
        fullName, 
        email, 
        password, 
        licenseNumber, 
        vehicleType 
      });

      const response = await api.post('/auth/login/driver', { email, password });
      setAuth(response.data.access_token, response.data.profile || { id: 'unknown', email });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center font-sans p-4 relative overflow-hidden">
      
      {/* Decorative Top Accent */}
      <div className="absolute top-0 left-0 w-full h-32 bg-orange-500 rounded-b-[40px] shadow-sm"></div>

      <div className="w-full max-w-md relative z-10 animate-fade-in-up mt-12 mb-8">
        
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center border-4 border-white shadow-md relative -mt-16">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-orange-600">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">Join Us</h1>
            <p className="text-slate-500 font-medium text-lg">Register as a driver partner</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-100 text-red-700 rounded-xl text-center font-bold text-lg shadow-sm border border-red-200">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-md font-bold text-slate-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Raju Tamang"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 text-lg font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-md font-bold text-slate-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="driver@example.com"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 text-lg font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-md font-bold text-slate-700 mb-2">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 text-lg font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all"
                />
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-md font-bold text-slate-700 mb-2">License #</label>
                  <input 
                    type="text" 
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    required
                    placeholder="WB74-XXXX"
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 text-lg font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-md font-bold text-slate-700 mb-2">Vehicle</label>
                  <input 
                    type="text" 
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    required
                    placeholder="Innova"
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 text-lg font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-4 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white text-xl font-bold rounded-2xl py-4 transition-all shadow-lg shadow-orange-600/30 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-slate-500 font-medium text-lg">
              Already have an account? <Link to="/login" className="text-orange-600 font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
