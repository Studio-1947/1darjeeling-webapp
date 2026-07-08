import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import ProviderSidebar from '../components/provider/ProviderSidebar';
import ProviderRightSidebar from '../components/provider/ProviderRightSidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import ProviderStep1OTP from '../components/provider/ProviderStep1OTP';
import ProviderStep2Role from '../components/provider/ProviderStep2Role';
import ProviderStep3Setup from '../components/provider/ProviderStep3Setup';

export default function ProviderPortal() {
  const navigate = useNavigate();
  const profile = useAuthStore((state) => state.profile);
  
  // step can be 1, 2, or 3
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  // Auto-progress based on auth state
  useEffect(() => {
    if (profile) {
      if (profile.role === 'provider-pending') {
        if (step === 1) setStep(2);
      } else if (['homestay', 'driver', 'cafe'].includes(profile.role || '')) {
        // If they already have a set role and have completed setup
        // But let's check if they actually have a profile config
        // The hasSetup flag from login/verify would be better, but we'll assume if they aren't 'provider-pending' they are done.
        navigate('/dashboard');
      }
    }
  }, [profile, navigate, step]);

  const handleOTPComplete = () => {
    setStep(2);
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setStep(3);
  };

  const handleSetupComplete = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-canvas-soft flex flex-col font-sans">
      <Navbar activeTab="stays" searchQuery={searchQuery} onSearchChange={setSearchQuery} variant="solid" />

      <div className="flex-1 flex max-w-[1400px] mx-auto w-full pt-24">
        {step > 1 && <ProviderSidebar />}

        {/* Main Content */}
        <main className={`flex-1 py-12 px-6 lg:px-12 ${step === 2 ? 'max-w-5xl' : 'max-w-3xl'} mx-auto`}>
          <div className="inline-block px-3 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded tracking-wide mb-6 uppercase">
            Step {step} of 3
          </div>
          
          {step === 1 && <ProviderStep1OTP onSuccess={handleOTPComplete} />}
          {step === 2 && <ProviderStep2Role onSelectRole={handleRoleSelect} />}
          {step === 3 && <ProviderStep3Setup role={selectedRole} onSuccess={handleSetupComplete} />}

        </main>

        {step > 1 && <ProviderRightSidebar />}
      </div>
      
      <Footer />
    </div>
  );
}
