import { useState } from 'react';
import { api } from '../api/client';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Register the homestay
      await api.post('/api/homestay/register', { email, password, propertyName });
      
      // 2. Automatically log them in
      const loginResponse = await api.post('/auth/login/homestay', { email, password });
      
      // Assuming jwt payload has 'sub' for the user id
      const profile = loginResponse.data.profile || { id: 'unknown', email };
      setAuth(loginResponse.data.access_token, profile);
      
      // 3. Go to dashboard
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#B48530] opacity-20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-500 opacity-10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-lg px-8 py-12 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl relative z-10 animate-fade-in-up">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Become a Partner</h1>
          <p className="text-slate-400">Join our premium homestay network</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-medium text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Property Name</label>
              <input 
                type="text" 
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                required
                placeholder="Darjeeling Mountain View"
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#B48530] focus:ring-1 focus:ring-[#B48530] transition-all"
              />
            </div>

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
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
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
            {loading ? 'Registering...' : 'Register Property'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Already have an account? <Link to="/login" className="text-[#B48530] hover:text-[#C59640] font-medium transition-colors">Sign In</Link>
          </p>
        </div>
      </div>
      
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
