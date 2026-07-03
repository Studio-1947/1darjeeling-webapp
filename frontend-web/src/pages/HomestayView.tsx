import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CoverPhoto, PropertyDetails } from '@darjeeling/shared';

export default function HomestayView() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [homestay, setHomestay] = useState<any>(null);
  
  // Dummy state for navbar to work on this page
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchHomestay = async () => {
      try {
        const response = await api.get(`/api/homestay/public/${id}`);
        setHomestay(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load homestay details');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchHomestay();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <div className="animate-pulse text-primary font-semibold">Loading Homestay...</div>
      </div>
    );
  }

  if (error || !homestay) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-canvas text-ink">
        <Navbar activeTab="stays" searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="mt-32 text-center">
          <h2 className="text-2xl font-bold mb-2">Oops!</h2>
          <p className="text-body-text">{error || 'Homestay not found.'}</p>
        </div>
      </div>
    );
  }

  // Construct form data object to pass to PropertyDetails based on the public payload
  const form = {
    location: homestay.essentialsConfig?.location || '',
    basePrice: homestay.essentialsConfig?.basePrice ? String(homestay.essentialsConfig.basePrice) : '',
    amenities: homestay.essentialsConfig?.amenities ? homestay.essentialsConfig.amenities.join(', ') : ''
  };

  return (
    <div className="min-h-screen bg-canvas text-ink selection:bg-primary selection:text-canvas">
      <Navbar activeTab="stays" searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      {/* We add some top padding so it sits nicely below the fixed Navbar */}
      <main className="pt-24 pb-12 max-w-7xl mx-auto px-6 md:px-20 animate-fade-in">
        <CoverPhoto propertyName={homestay.propertyName} location={form.location} />
        
        <div className="mt-8 flex flex-col lg:flex-row gap-12">
          {/* Left Column: Details */}
          <div className="flex-1">
            {/* 
              We use our shared PropertyDetails component. 
              Since this is the consumer view, we force isEditing={false}.
              We pass an empty setter since it will never be called.
            */}
            <PropertyDetails
              isEditing={false}
              form={form}
              setForm={() => {}}
              setIsEditing={() => {}}
              handleSave={async () => {}}
              saving={false}
              error=""
            />
          </div>
          
          {/* Right Column: Sticky Booking Widget Placeholder */}
          <div className="w-full lg:w-96">
            <div className="sticky top-32 bg-white border border-hairline rounded-2xl shadow-xl p-6">
              <div className="mb-4">
                <span className="text-2xl font-bold text-ink">
                  ₹{form.basePrice || '???'}
                </span>
                <span className="text-body-text"> / night</span>
              </div>
              
              <div className="border border-mute rounded-xl overflow-hidden mb-4">
                <div className="flex border-b border-mute">
                  <div className="flex-1 p-3 border-r border-mute">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-ink mb-1">Check-in</div>
                    <div className="text-sm text-body-text">Add date</div>
                  </div>
                  <div className="flex-1 p-3">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-ink mb-1">Checkout</div>
                    <div className="text-sm text-body-text">Add date</div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-ink mb-1">Guests</div>
                  <div className="text-sm text-body-text">1 guest</div>
                </div>
              </div>

              <button className="btn-airbnb-primary w-full">
                Reserve
              </button>
              
              <p className="text-center text-xs text-body-text mt-3">You won't be charged yet</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
