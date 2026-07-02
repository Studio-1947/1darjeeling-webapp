import { useState } from 'react';
import { api } from '../api/client';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
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
      const response = await api.post('/auth/login/user', { email, password });
      // Note: Backend might not be sending the full 'profile' object in response yet based on the current auth.service.ts
      // Actually, auth.service.ts only sends { access_token }. We'll just pass a dummy profile for now, 
      // or if it does send profile, we use it.
      setAuth(response.data.access_token, response.data.profile || { id: '1', email });
      onClose();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-canvas w-full max-w-md rounded-2xl shadow-2xl animate-scale-up overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-hairline">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-canvas-soft rounded-full transition-colors cursor-pointer border-none bg-transparent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-base font-bold flex-1 text-center pr-9">Log in or sign up</h2>
        </div>

        {/* Body */}
        <div className="px-6 py-8">
          <h3 className="text-2xl font-bold tracking-tight mb-6 text-ink">
            Welcome to 1darjeeling
          </h3>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                {error}
              </div>
            )}
            
            <div className="rounded-xl border border-mute overflow-hidden focus-within:border-ink transition-colors">
              <div className="relative border-b border-mute">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pt-6 pb-2 px-4 outline-none bg-transparent peer text-ink placeholder-transparent"
                  placeholder="Email"
                />
                <label className="absolute left-4 top-2 text-xs text-mute font-medium peer-placeholder-shown:text-base peer-placeholder-shown:top-4 transition-all pointer-events-none">
                  Email
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pt-6 pb-2 px-4 outline-none bg-transparent peer text-ink placeholder-transparent"
                  placeholder="Password"
                />
                <label className="absolute left-4 top-2 text-xs text-mute font-medium peer-placeholder-shown:text-base peer-placeholder-shown:top-4 transition-all pointer-events-none">
                  Password
                </label>
              </div>
            </div>

            <p className="text-xs text-body-text mt-4 leading-relaxed">
              We'll call or text you to confirm your number. Standard message and data rates apply. <a href="#" className="font-semibold underline">Privacy Policy</a>
            </p>

            <button
              type="submit"
              disabled={loading}
              className="btn-airbnb-primary mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Continue'}
            </button>
          </form>

          <div className="my-6 flex items-center justify-center gap-4 text-xs font-medium text-mute">
            <span className="flex-1 h-px bg-hairline"></span>
            <span>or</span>
            <span className="flex-1 h-px bg-hairline"></span>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 py-3 border border-ink rounded-lg font-semibold hover:bg-canvas-soft transition-colors text-ink">
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 py-3 border border-ink rounded-lg font-semibold hover:bg-canvas-soft transition-colors text-ink">
              Continue with Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
