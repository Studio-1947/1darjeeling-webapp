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
      const response = await api.post('/auth/login/homestay', { email, password });
      setAuth(response.data.access_token, response.data.profile || { id: '1', email });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex items-center justify-center relative overflow-hidden font-sans">
      {/* Background ambient light effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#B48530] opacity-20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-500 opacity-10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-lg px-8 py-12 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl relative z-10 animate-fade-in-up">
        
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#B48530] to-[#8C6420] flex items-center justify-center shadow-lg shadow-[#B48530]/20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Partner Portal</h1>
          <p className="text-slate-400">Manage your premium homestay experience</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-medium text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="homestay@example.com"
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#B48530] focus:ring-1 focus:ring-[#B48530] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex justify-between">
                <span>Password</span>
                <a href="#" className="text-[#B48530] hover:text-[#C59640] transition-colors">Forgot?</a>
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#B48530] focus:ring-1 focus:ring-[#B48530] transition-all"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#B48530] to-[#996F25] hover:from-[#C59640] hover:to-[#A87B2C] text-white font-semibold rounded-xl py-3.5 transition-all shadow-lg shadow-[#B48530]/25 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

      </div>
      
      {/* Just a tiny inline style for the animation since we are injecting this without changing the tailwind config */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
