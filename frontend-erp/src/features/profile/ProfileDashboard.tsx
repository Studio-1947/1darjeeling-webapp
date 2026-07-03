import { useProfile } from './hooks/useProfile';
import { ProfileHeader } from './components/ProfileHeader';
import { CoverPhoto, PropertyDetails } from '@darjeeling/shared';

export default function ProfileDashboard() {
  const {
    loading,
    saving,
    error,
    isEditing,
    setIsEditing,
    profile,
    form,
    setForm,
    handleSave,
  } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="animate-pulse text-[#B48530] font-semibold">Loading Profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans pb-16">
      <ProfileHeader />

      <div className="max-w-5xl mx-auto px-6 mt-8">
        <CoverPhoto propertyName={profile.propertyName} location={form.location} />
        
        <PropertyDetails 
          email={profile.email}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          saving={saving}
          handleSave={handleSave}
          error={error}
          form={form}
          setForm={setForm}
        />
      </div>
    </div>
  );
}
