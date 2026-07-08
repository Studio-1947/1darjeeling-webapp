import React, { useState } from 'react';
import { api } from '../../api/client';
import { useAuthStore } from '../../store/authStore';

export default function ProviderDashboard() {
  const profile = useAuthStore((state) => state.profile);
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  const initialConfig = profile?.profileConfig || {};
  
  // Shared
  const [name, setName] = useState(
    initialConfig.propertyName || initialConfig.driverName || initialConfig.cafeName || ''
  );
  
  // Homestay specific
  const [location, setLocation] = useState(initialConfig.location || '');
  const [capacity, setCapacity] = useState(initialConfig.capacity || '');
  const [rooms, setRooms] = useState(initialConfig.rooms || '');
  
  // Driver specific
  const [route, setRoute] = useState(initialConfig.primaryRoute || '');
  const [vehicleType, setVehicleType] = useState(initialConfig.vehicleType || '');
  const [registrationNumber, setRegistrationNumber] = useState(initialConfig.registrationNumber || '');
  
  // Cafe specific
  const [operatingHours, setOperatingHours] = useState(initialConfig.operatingHours || '');
  const [bestItem, setBestItem] = useState(initialConfig.bestItem || '');
  
  const role = profile?.role;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    setLoading(true);
    setError('');
    setSuccess('');

    let config: any = {};
    if (role === 'homestay') {
      config = { propertyName: name, location, capacity, rooms };
    } else if (role === 'driver') {
      config = { driverName: name, primaryRoute: route, vehicleType, registrationNumber };
    } else if (role === 'cafe') {
      config = { cafeName: name, location, operatingHours, bestItem };
    }

    try {
      const { data } = await api.put(`/auth/provider/${profile.id}/setup`, {
        role,
        profileConfig: config
      });
      // Update auth store with new token & profile
      setAuth(data.access_token, data.profile);
      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save details');
    } finally {
      setLoading(false);
    }
  };

  const renderHomestayForm = () => (
    <>
      <div className="space-y-2">
        <label className="text-xs font-bold text-ink uppercase tracking-wider">Property Name</label>
        <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-ink uppercase tracking-wider">Neighborhood / Landmark</label>
        <input type="text" required value={location} onChange={e => setLocation(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-ink uppercase tracking-wider">Max Guest Capacity</label>
          <input type="number" required value={capacity} onChange={e => setCapacity(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-ink uppercase tracking-wider">Number of Rooms</label>
          <input type="number" required value={rooms} onChange={e => setRooms(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" />
        </div>
      </div>
    </>
  );

  const renderDriverForm = () => (
    <>
      <div className="space-y-2">
        <label className="text-xs font-bold text-ink uppercase tracking-wider">Driver Name</label>
        <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-ink uppercase tracking-wider">Primary Route / Taxi Stand</label>
        <input type="text" required value={route} onChange={e => setRoute(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-ink uppercase tracking-wider">Vehicle Type</label>
          <input type="text" required value={vehicleType} onChange={e => setVehicleType(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-ink uppercase tracking-wider">Vehicle Reg. Number</label>
          <input type="text" required value={registrationNumber} onChange={e => setRegistrationNumber(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" />
        </div>
      </div>
    </>
  );

  const renderCafeForm = () => (
    <>
      <div className="space-y-2">
        <label className="text-xs font-bold text-ink uppercase tracking-wider">Cafe / Restaurant Name</label>
        <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-ink uppercase tracking-wider">Location / Neighborhood</label>
        <input type="text" required value={location} onChange={e => setLocation(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-ink uppercase tracking-wider">Operating Hours</label>
          <input type="text" required value={operatingHours} onChange={e => setOperatingHours(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-ink uppercase tracking-wider">Best-Selling Item</label>
          <input type="text" required value={bestItem} onChange={e => setBestItem(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" />
        </div>
      </div>
    </>
  );

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <div className="bg-white rounded-2xl border border-hairline p-8 shadow-sm">
        <div className="mb-8 border-b border-canvas-softer pb-6">
          <h2 className="text-2xl font-bold text-ink mb-2">Manage Your Public Profile</h2>
          <p className="text-sm text-body-text">
            These details are displayed on your public service card to tourists on the homepage.
          </p>
        </div>

        {error && (
          <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
            {error}
          </div>
        )}
        
        {success && (
          <div className="p-4 mb-6 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {role === 'homestay' && renderHomestayForm()}
          {role === 'driver' && renderDriverForm()}
          {role === 'cafe' && renderCafeForm()}

          <div className="pt-6 border-t border-canvas-softer">
            <button
              type="submit"
              disabled={loading}
              className="w-auto px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Profile Details'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
