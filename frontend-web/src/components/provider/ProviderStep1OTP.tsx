import React, { useState } from 'react';
import { api } from '../../api/client';
import { useAuthStore } from '../../store/authStore';

interface ProviderStep1OTPProps {
  onSuccess: () => void;
}

export default function ProviderStep1OTP({ onSuccess }: ProviderStep1OTPProps) {
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    
    if (mode === 'REGISTER' && name.length < 2) {
      setError('Please enter your full name.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const { data } = await api.post('/auth/provider/send-otp', { phone });
      
      if (mode === 'REGISTER' && !data.isNewUser) {
        setError('This number is already registered. Please login instead.');
        setLoading(false);
        return;
      }
      
      if (mode === 'LOGIN' && data.isNewUser) {
        setError('This number is not registered yet. Please sign up.');
        setLoading(false);
        return;
      }
      
      setStep('OTP');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = mode === 'REGISTER' ? { phone, otp, name } : { phone, otp };
      const { data } = await api.post('/auth/provider/verify-otp', payload);
      setAuth(data.access_token, data.profile);
      
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-canvas rounded-xl border border-hairline p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-ink mb-2">Partner Portal</h2>
        <p className="text-sm text-mute">Manage your local business on 1darjeeling.</p>
      </div>

      {step === 'PHONE' && (
        <div className="flex border-b border-mute/20 mb-6">
          <button
            type="button"
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-colors border-none bg-transparent ${mode === 'LOGIN' ? 'text-ink border-ink border-solid border-x-0 border-t-0 border-b-2' : 'text-mute hover:text-ink'}`}
            onClick={() => { setMode('LOGIN'); setError(''); }}
          >
            Login
          </button>
          <button
            type="button"
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-colors border-none bg-transparent ${mode === 'REGISTER' ? 'text-ink border-ink border-solid border-x-0 border-t-0 border-b-2' : 'text-mute hover:text-ink'}`}
            onClick={() => { setMode('REGISTER'); setError(''); }}
          >
            Register
          </button>
        </div>
      )}

      {error && (
        <div className="p-3 mb-6 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

      {step === 'PHONE' ? (
        <form onSubmit={handleSendOtp} className="space-y-6">
          {mode === 'REGISTER' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-ink uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink font-medium tracking-wide"
                placeholder="e.g. Rahul Chettri"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-ink uppercase tracking-wider">Mobile Number</label>
            <div className="flex">
              <div className="flex items-center justify-center px-4 bg-canvas-soft border border-mute/40 border-r-0 rounded-l-lg text-mute font-medium">
                +91
              </div>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                maxLength={10}
                className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-r-lg outline-none focus:border-ink transition-colors text-ink font-medium tracking-wide"
                placeholder="9876543210"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || phone.length < 10 || (mode === 'REGISTER' && name.length < 2)}
            className="w-full py-3 bg-[#0a192f] hover:bg-[#112240] text-canvas font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Get OTP'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-ink uppercase tracking-wider">Enter OTP</label>
            <input
              type="text"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              maxLength={6}
              className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink text-center text-xl tracking-[0.5em] font-bold"
              placeholder="••••••"
            />
            <p className="text-xs text-mute mt-2">For testing, use 123456</p>
          </div>

          <button
            type="submit"
            disabled={loading || otp.length < 6}
            className="w-full py-3 bg-[#0a192f] hover:bg-[#112240] text-canvas font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </button>

          <button
            type="button"
            onClick={() => setStep('PHONE')}
            className="w-full py-2 text-sm font-medium text-mute hover:text-ink transition-colors cursor-pointer bg-transparent border-none"
          >
            Go Back
          </button>
        </form>
      )}
    </div>
  );
}
