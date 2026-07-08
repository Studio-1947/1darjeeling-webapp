import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuthStore } from '../store/authStore';
import ProviderDashboard from '../components/provider/ProviderDashboard';

export default function Dashboard() {
  const profile = useAuthStore((state) => state.profile);
  const [searchQuery, setSearchQuery] = useState('');

  const isProvider = ['homestay', 'driver', 'cafe'].includes(profile?.role || '');

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <Navbar activeTab="dashboard" searchQuery={searchQuery} onSearchChange={setSearchQuery} variant="solid" />
      
      <main className="flex-1 flex flex-col items-center justify-start p-6 pt-24 text-center">
        {!isProvider && (
          <div className="flex flex-col items-center justify-center h-full mt-24">
            <h1 className="text-4xl font-bold mb-4 text-ink">Welcome to your Dashboard</h1>
            {profile?.firstName && (
              <p className="text-xl text-ink font-medium mb-4">Hello, {profile.firstName}!</p>
            )}
            <p className="text-body-text max-w-lg">
              Your profile is set up. Soon you will be able to manage your bookings, properties, and more directly from here.
            </p>
          </div>
        )}

        {isProvider && (
          <div className="w-full">
            <h1 className="text-4xl font-bold mb-2 text-ink mt-8">Dashboard</h1>
            {profile?.firstName && (
              <p className="text-lg text-mute font-medium mb-8">Welcome back, {profile.firstName}</p>
            )}
            <ProviderDashboard />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
