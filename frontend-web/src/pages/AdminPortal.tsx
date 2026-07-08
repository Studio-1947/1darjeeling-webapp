import { useState, useEffect } from 'react';
import { api } from '../api/client';
import { useAuthStore } from '../store/authStore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AdminPortal() {
  const { isAuthenticated, profile, setAuth } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [dashboardData, setDashboardData] = useState<{tourists: any[], providers: any[]}>({ tourists: [], providers: [] });
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && profile?.role === 'admin') {
      fetchAdminData();
    }
  }, [isAuthenticated, profile]);

  const fetchAdminData = async () => {
    setDataLoading(true);
    try {
      const { data } = await api.get('/api/admin/users');
      setDashboardData({ tourists: data.tourists, providers: data.providers });
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        useAuthStore.getState().clearAuth();
      }
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data } = await api.post('/auth/admin-login', { email, password });
      setAuth(data.access_token, data.profile);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || profile?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-canvas flex flex-col">
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-canvas-softer">
            <h1 className="text-3xl font-bold text-ink text-center mb-2">Admin Access</h1>
            <p className="text-body-text text-center mb-8">Authorized personnel only</p>
            
            {error && (
              <div className="mb-6 rounded-lg border border-red-100 bg-red-50 p-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-canvas-softer bg-canvas-soft px-4 py-3 text-sm text-ink placeholder:text-mute focus:border-primary focus:bg-canvas focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-canvas-softer bg-canvas-soft px-4 py-3 text-sm text-ink placeholder:text-mute focus:border-primary focus:bg-canvas focus:outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer rounded-xl bg-primary py-3 text-sm font-bold text-canvas transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Authenticating...' : 'Secure Login'}
              </button>
            </form>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <Navbar variant="solid" searchQuery="" onSearchChange={() => {}} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 pt-28">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-bold text-ink mb-2">Admin Dashboard</h1>
            <p className="text-body-text">Monitor tourists and service providers.</p>
          </div>
          <button 
            onClick={fetchAdminData}
            disabled={dataLoading}
            className="px-4 py-2 bg-canvas-soft hover:bg-canvas-softer text-ink font-semibold rounded-lg border border-canvas-softer cursor-pointer transition-colors"
          >
            {dataLoading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Tourists Section */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-6 flex items-center justify-between">
              Tourists
              <span className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full">{dashboardData.tourists.length}</span>
            </h2>
            <div className="space-y-4">
              {dashboardData.tourists.length === 0 ? (
                <p className="text-mute italic">No tourists registered yet.</p>
              ) : (
                dashboardData.tourists.map(t => (
                  <div key={t.id} className="p-5 rounded-xl border border-canvas-softer bg-white shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-ink text-lg">{t.firstName} {t.lastName}</h3>
                        <p className="text-xs text-mute font-medium">{t.phone}</p>
                      </div>
                      <span className="text-xs text-mute bg-canvas-soft px-2 py-1 rounded">
                        {new Date(t.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {t.touristConfig ? (
                      <div className="bg-canvas-soft p-3 rounded-lg text-sm text-body-text space-y-1">
                        <p><strong className="text-ink">From:</strong> {t.touristConfig.location || 'N/A'}</p>
                        <p><strong className="text-ink">Trip Type:</strong> {t.touristConfig.tripType || 'N/A'}</p>
                        <p><strong className="text-ink">Budget:</strong> {t.touristConfig.budget || 'N/A'}</p>
                        {t.touristConfig.interests?.length > 0 && (
                          <p><strong className="text-ink">Interests:</strong> {t.touristConfig.interests.join(', ')}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-mute italic">Profile incomplete</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Providers Section */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-6 flex items-center justify-between">
              Service Providers
              <span className="bg-ink/10 text-ink text-sm py-1 px-3 rounded-full">{dashboardData.providers.length}</span>
            </h2>
            <div className="space-y-4">
              {dashboardData.providers.length === 0 ? (
                <p className="text-mute italic">No service providers registered yet.</p>
              ) : (
                dashboardData.providers.map(p => (
                  <div key={p.id} className="p-5 rounded-xl border border-canvas-softer bg-white shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-ink text-lg">{p.firstName} {p.lastName}</h3>
                        <p className="text-xs text-mute font-medium">{p.phone} {p.email ? `• ${p.email}` : ''}</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${
                        p.role === 'homestay' ? 'bg-blue-100 text-blue-800' :
                        p.role === 'driver' ? 'bg-green-100 text-green-800' :
                        p.role === 'cafe' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {p.role}
                      </span>
                    </div>
                    {p.providerConfig ? (
                      <div className="bg-canvas-soft p-3 rounded-lg text-sm text-body-text space-y-1">
                        <p><strong className="text-ink">Business:</strong> {p.providerConfig.propertyName || p.providerConfig.driverName || p.providerConfig.cafeName || 'N/A'}</p>
                        <p><strong className="text-ink">Area:</strong> {p.providerConfig.location || p.providerConfig.primaryRoute || 'N/A'}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-mute italic">Profile incomplete</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
