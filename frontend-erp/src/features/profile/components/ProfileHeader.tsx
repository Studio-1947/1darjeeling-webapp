import { useAuthStore } from '../../../store/authStore';
import { useNavigate } from 'react-router-dom';

export function ProfileHeader() {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#0F172A]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="font-bold text-xl text-white tracking-tight flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#B48530] to-[#8C6420] flex items-center justify-center shadow-lg shadow-[#B48530]/20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
          </svg>
        </div>
        Partner Portal
      </div>
      <button onClick={handleLogout} className="text-sm font-medium bg-white/10 hover:bg-white/20 px-5 py-2 rounded-xl transition-colors border border-white/10">
        Logout
      </button>
    </div>
  );
}
