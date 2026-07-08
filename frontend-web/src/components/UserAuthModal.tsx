import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { api } from '../api/client';
import { useAuthStore } from '../store/authStore';

interface UserAuthModalProps {
  onClose: () => void;
  initialStep?: 'PHONE' | 'OTP' | 'SETUP';
}

export default function UserAuthModal({ onClose, initialStep = 'PHONE' }: UserAuthModalProps) {
  const profile = useAuthStore((state) => state.profile);
  const setAuth = useAuthStore((state) => state.setAuth);

  const [step, setStep] = useState<'PHONE' | 'OTP' | 'SETUP'>(initialStep);
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  // Setup fields
  const config = profile?.touristConfig || {};
  const [name, setName] = useState(profile?.firstName ? `${profile.firstName} ${profile.lastName || ''}`.trim() : '');
  const [location, setLocation] = useState(config.location || '');
  const [tripType, setTripType] = useState(config.tripType || '');
  const [budget, setBudget] = useState(config.budget || '');
  const [interests, setInterests] = useState<string[]>(config.interests || []);
  const [needs, setNeeds] = useState<string[]>(config.needs || []);

  useEffect(() => {
    // Prevent background scrolling while modal is open.
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const { data } = await api.post('/auth/send-otp', { phone });
      setIsNewUser(data.isNewUser);
      setStep('OTP');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/verify-otp', { phone, otp, role: 'tourist' });
      
      if (isNewUser) {
        setStep('SETUP');
        setAuth(data.access_token, data.profile);
      } else {
        setAuth(data.access_token, data.profile);
        onClose();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleSetupProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.id) return;
    
    const profileConfig = { location, tripType, budget, interests, needs };

    setLoading(true);
    setError('');
    
    try {
      const { data } = await api.put(`/auth/${profile.id}/setup`, {
        role: 'tourist',
        profileConfig,
        name
      });
      setAuth(data.access_token, data.profile);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to complete setup');
    } finally {
      setLoading(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };
  
  const toggleNeed = (need: string) => {
    setNeeds(prev => 
      prev.includes(need) ? prev.filter(n => n !== need) : [...prev, need]
    );
  };

  const inputClass = "w-full rounded-xl border border-canvas-softer bg-canvas-soft px-4 py-3 text-sm text-ink placeholder:text-mute focus:border-primary focus:bg-canvas focus:outline-none transition-colors";

  const modalContent = (
    <div data-lenis-prevent className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-canvas shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-8 pb-4 flex justify-between items-center shrink-0 border-b border-hairline">
          <div>
            <h2 className="text-2xl font-bold text-ink">
              {step === 'PHONE' ? 'Log in or sign up' : step === 'OTP' ? 'Enter OTP' : 'Plan your trip'}
            </h2>
            <p className="text-sm text-mute mt-1">
              {step === 'PHONE' ? 'Welcome to 1darjeeling' : step === 'OTP' ? 'We sent a code to your number' : 'Tell us what you are looking for'}
            </p>
          </div>
          <button onClick={onClose} className="text-mute hover:text-ink transition-colors cursor-pointer text-xl p-2 bg-transparent border-none">
            ✕
          </button>
        </div>

        <div className="p-8 overflow-y-auto">
          {error && (
            <div className="mb-6 rounded-lg border border-red-100 bg-red-50 p-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {step === 'PHONE' && (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink uppercase tracking-wider">Mobile Number</label>
                <div className="flex">
                  <div className="flex items-center justify-center px-4 bg-canvas-soft border border-canvas-softer border-r-0 rounded-l-xl text-mute font-medium">
                    +91
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    maxLength={10}
                    className="w-full px-4 py-3 bg-canvas-soft border border-canvas-softer rounded-r-xl outline-none focus:border-primary focus:bg-canvas transition-colors text-ink font-medium tracking-wide"
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || phone.length < 10}
                className="w-full cursor-pointer rounded-xl bg-primary py-3 text-sm font-bold text-canvas transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Sending...' : 'Continue'}
              </button>
            </form>
          )}

          {step === 'OTP' && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink uppercase tracking-wider">One-Time Password</label>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  maxLength={6}
                  className="w-full px-4 py-4 bg-canvas-soft border border-canvas-softer rounded-xl outline-none focus:border-primary focus:bg-canvas transition-colors text-ink text-center text-2xl tracking-[0.5em] font-bold"
                  placeholder="••••••"
                />
                <p className="text-xs text-mute mt-2 text-center">For testing, use 123456</p>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length < 6}
                className="w-full cursor-pointer rounded-xl bg-primary py-3 text-sm font-bold text-canvas transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Verifying...' : 'Verify & Continue'}
              </button>
              
              <button
                type="button"
                onClick={() => setStep('PHONE')}
                className="w-full py-2 text-sm font-medium text-mute hover:text-ink transition-colors cursor-pointer bg-transparent border-none text-center"
              >
                Change Phone Number
              </button>
            </form>
          )}

          {step === 'SETUP' && (
            <form onSubmit={handleSetupProfile} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Maya Tamang"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink uppercase tracking-wider">Where are you coming from?</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Kolkata, Delhi"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink uppercase tracking-wider">Trip Type</label>
                <div className="flex gap-2 flex-wrap">
                  {['Solo', 'Couple', 'Family', 'Friends group'].map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTripType(t)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${tripType === t ? 'bg-primary text-canvas border-primary' : 'bg-canvas-soft border-canvas-softer text-body-text hover:border-primary/50 hover:text-ink'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink uppercase tracking-wider">Budget Range (per day)</label>
                <div className="flex gap-2 flex-wrap">
                  {['Under ₹2,000', '₹2,000–5,000', '₹5,000+'].map(b => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${budget === b ? 'bg-primary text-canvas border-primary' : 'bg-canvas-soft border-canvas-softer text-body-text hover:border-primary/50 hover:text-ink'}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink uppercase tracking-wider">Interests</label>
                <div className="flex gap-2 flex-wrap">
                  {['Trekking', 'Tea gardens', 'Photography', 'Monasteries', 'Local food', 'Toy train', 'Nightlife'].map(i => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => toggleInterest(i)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${interests.includes(i) ? 'bg-primary text-canvas border-primary' : 'bg-canvas-soft border-canvas-softer text-body-text hover:border-primary/50 hover:text-ink'}`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-ink uppercase tracking-wider">I am looking for...</label>
                <div className="flex gap-2 flex-wrap">
                  {['Transport', 'Stay', 'Guide'].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => toggleNeed(n)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${needs.includes(n) ? 'bg-primary text-canvas border-primary' : 'bg-canvas-soft border-canvas-softer text-body-text hover:border-primary/50 hover:text-ink'}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !name || !location || !tripType || !budget}
                className="w-full cursor-pointer rounded-xl bg-primary py-3 text-sm font-bold text-canvas transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 mt-4"
              >
                {loading ? 'Saving...' : 'Finish Setup'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
