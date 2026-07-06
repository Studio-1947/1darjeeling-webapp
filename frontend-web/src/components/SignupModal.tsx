import { useState } from 'react';
import { api } from '../api/client';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

interface SignupModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function SignupModal({ onClose, onSwitchToLogin }: SignupModalProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Register the user
      await api.post('/api/users/register', { firstName, lastName, email, password });
      
      // 2. Automatically log them in
      const loginResponse = await api.post('/auth/login/user', { email, password });
      
      const profile = loginResponse.data.profile || { id: 'unknown', email };
      setAuth(loginResponse.data.access_token, profile);
      
      onClose();
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
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
          <h2 className="text-base font-bold flex-1 text-center pr-9">Finish signing up</h2>
        </div>

        {/* Body */}
        <div className="px-6 py-8">
          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                {error}
              </div>
            )}
            
            <div className="rounded-xl border border-mute overflow-hidden focus-within:border-ink transition-colors">
              <div className="relative border-b border-mute">
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full pt-6 pb-2 px-4 outline-none bg-transparent peer text-ink placeholder-transparent"
                  placeholder="First name"
                />
                <label className="absolute left-4 top-2 text-xs text-mute font-medium peer-placeholder-shown:text-base peer-placeholder-shown:top-4 transition-all pointer-events-none">
                  First name
                </label>
              </div>
              <div className="relative border-b border-mute">
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full pt-6 pb-2 px-4 outline-none bg-transparent peer text-ink placeholder-transparent"
                  placeholder="Last name"
                />
                <label className="absolute left-4 top-2 text-xs text-mute font-medium peer-placeholder-shown:text-base peer-placeholder-shown:top-4 transition-all pointer-events-none">
                  Last name
                </label>
              </div>
              <p className="px-4 py-2 text-xs text-mute">Make sure it matches the name on your government ID.</p>
              
              <div className="relative border-t border-b border-mute">
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
              By selecting <strong>Agree and continue</strong>, I agree to 1darjeeling's Terms of Service, Payments Terms of Service, and Nondiscrimination Policy and acknowledge the Privacy Policy.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="btn-airbnb-primary mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Agree and continue'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-ink">
              Already have an account?{' '}
              <button 
                type="button" 
                onClick={onSwitchToLogin}
                className="font-semibold underline hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
