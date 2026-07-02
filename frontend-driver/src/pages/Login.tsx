import { useState } from 'react';
import { api } from '../api/client';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login/driver', { email, password });
      setAuth(response.data.access_token, response.data.profile || { id: '1', email });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center font-sans p-4 relative overflow-hidden">
      
      {/* Decorative Top Accent */}
      <div className="absolute top-0 left-0 w-full h-32 bg-orange-500 rounded-b-[40px] shadow-sm"></div>

      <div className="w-full max-w-sm relative z-10 animate-fade-in-up">
        
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center border-4 border-white shadow-md relative -mt-16">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-orange-600">
                <path d="M12.923 2.146a.75.75 0 0 0-1.846 0L1.758 13.918A.75.75 0 0 0 2.292 15h19.416a.75.75 0 0 0 .534-1.082L12.923 2.146Z" />
                <path d="M10.865 14H13v3.75c0 .414-.336.75-.75.75h-1.5a.75.75 0 0 1-.75-.75V14Z" />
              </svg>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">Driver App</h1>
            <p className="text-slate-500 font-medium text-lg">Sign in to start earning</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-100 text-red-700 rounded-xl text-center font-bold text-lg shadow-sm border border-red-200">
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-lg font-bold text-slate-700 mb-2">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="driver@example.com"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 text-xl font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-slate-700 mb-2">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 text-xl font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white text-xl font-bold rounded-2xl py-5 transition-all shadow-lg shadow-orange-600/30 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
        
        <p className="text-center mt-8 text-slate-500 font-medium">
          Need help? <a href="#" className="text-orange-600 font-bold underline">Contact Support</a>
        </p>

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
