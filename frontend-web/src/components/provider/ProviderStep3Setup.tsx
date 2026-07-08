import React, { useState } from 'react';
import { api } from '../../api/client';
import { useAuthStore } from '../../store/authStore';

interface ProviderStep3SetupProps {
  role: string;
  onSuccess: () => void;
}

export default function ProviderStep3Setup({ role, onSuccess }: ProviderStep3SetupProps) {
  const profile = useAuthStore((state) => state.profile);
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Shared fields
  const [name, setName] = useState('');
  
  // Homestay specific
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [rooms, setRooms] = useState('');
  
  // Driver specific
  const [route, setRoute] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  
  // Cafe specific
  const [operatingHours, setOperatingHours] = useState('');
  const [bestItem, setBestItem] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    setLoading(true);
    setError('');

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
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save setup');
    } finally {
      setLoading(false);
    }
  };

  const renderHomestayForm = () => (
    <>
      <div className="space-y-2">
        <label className="text-xs font-bold text-ink uppercase tracking-wider">Property Name</label>
        <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" placeholder="e.g. Mountain View Homestay" />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-ink uppercase tracking-wider">Neighborhood / Landmark</label>
        <input type="text" required value={location} onChange={e => setLocation(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" placeholder="e.g. Near Chowrasta" />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-ink uppercase tracking-wider">Max Guest Capacity</label>
          <input type="number" required value={capacity} onChange={e => setCapacity(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" placeholder="e.g. 10" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-ink uppercase tracking-wider">Number of Rooms</label>
          <input type="number" required value={rooms} onChange={e => setRooms(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" placeholder="e.g. 4" />
        </div>
      </div>
      
      <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg mt-6">
        <h4 className="text-sm font-bold text-orange-800 mb-2">Authenticity Check</h4>
        <p className="text-xs text-orange-700 mb-4">Please upload a photo of your most recent electricity bill along with your trade license.</p>
        <div className="border-2 border-dashed border-orange-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-orange-50/50 transition-colors">
          <span className="text-sm text-orange-600 font-medium">Click to upload documents (Simulated)</span>
        </div>
      </div>
    </>
  );

  const renderDriverForm = () => (
    <>
      <div className="space-y-2">
        <label className="text-xs font-bold text-ink uppercase tracking-wider">Driver Name</label>
        <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" placeholder="e.g. Rajesh Tamang" />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-ink uppercase tracking-wider">Primary Route / Taxi Stand</label>
        <input type="text" required value={route} onChange={e => setRoute(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" placeholder="e.g. NJP to Darjeeling" />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-ink uppercase tracking-wider">Vehicle Type</label>
          <input type="text" required value={vehicleType} onChange={e => setVehicleType(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" placeholder="e.g. Innova / SUV" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-ink uppercase tracking-wider">Vehicle Reg. Number</label>
          <input type="text" required value={registrationNumber} onChange={e => setRegistrationNumber(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" placeholder="e.g. WB74..." />
        </div>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mt-6">
        <h4 className="text-sm font-bold text-blue-800 mb-2">Authenticity Check</h4>
        <p className="text-xs text-blue-700 mb-4">Please upload a photo of your Taxi Syndicate/Union card or Driving License.</p>
        <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-blue-50/50 transition-colors">
          <span className="text-sm text-blue-600 font-medium">Click to upload documents (Simulated)</span>
        </div>
      </div>
    </>
  );

  const renderCafeForm = () => (
    <>
      <div className="space-y-2">
        <label className="text-xs font-bold text-ink uppercase tracking-wider">Cafe / Restaurant Name</label>
        <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" placeholder="e.g. Himalayan Coffee" />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-ink uppercase tracking-wider">Location / Neighborhood</label>
        <input type="text" required value={location} onChange={e => setLocation(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" placeholder="e.g. Nehru Road" />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-ink uppercase tracking-wider">Operating Hours</label>
          <input type="text" required value={operatingHours} onChange={e => setOperatingHours(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" placeholder="e.g. 8 AM - 8 PM" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-ink uppercase tracking-wider">Best-Selling Item</label>
          <input type="text" required value={bestItem} onChange={e => setBestItem(e.target.value)} className="w-full px-4 py-3 bg-canvas border border-mute/40 rounded-lg outline-none focus:border-ink transition-colors text-ink" placeholder="e.g. Darjeeling First Flush" />
        </div>
      </div>

      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg mt-6">
        <h4 className="text-sm font-bold text-emerald-800 mb-2">Authenticity Check</h4>
        <p className="text-xs text-emerald-700 mb-4">Please upload your FSSAI registration or a photo of you behind the main counter.</p>
        <div className="border-2 border-dashed border-emerald-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-emerald-50/50 transition-colors">
          <span className="text-sm text-emerald-600 font-medium">Click to upload documents (Simulated)</span>
        </div>
      </div>
    </>
  );

  return (
    <div className="bg-canvas rounded-xl border border-hairline p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-ink mb-2">
          {role === 'homestay' && 'Homestay Details'}
          {role === 'driver' && 'Driver Profile'}
          {role === 'cafe' && 'Cafe Information'}
        </h2>
        <p className="text-sm text-mute">Provide a few key details to set up your service profile.</p>
      </div>

      {error && (
        <div className="p-3 mb-6 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {role === 'homestay' && renderHomestayForm()}
        {role === 'driver' && renderDriverForm()}
        {role === 'cafe' && renderCafeForm()}

        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0a192f] hover:bg-[#112240] text-canvas font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Complete Setup'}
          </button>
        </div>
      </form>
    </div>
  );
}
