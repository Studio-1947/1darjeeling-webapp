import { useState, useEffect } from 'react';
import { api } from '../api/client';
import { useAuthStore } from '../store/authStore';

export interface DriverProfile {
  id: string;
  email: string;
  fullName: string;
  licenseNumber: string;
  vehicleType: string;
  profileConfig: {
    experienceYears?: number | string;
    languages?: string;
    routesOperated?: string;
  };
}

export function useDriverProfile() {
  const profile = useAuthStore(state => state.profile);
  const [data, setData] = useState<DriverProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Editable form state
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    experienceYears: '' as number | string,
    languages: '',
    routesOperated: ''
  });

  useEffect(() => {
    if (!profile?.id) return;
    
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/api/driver/${profile.id}/profile`);
        setData(response.data);
        setForm({
          experienceYears: response.data.profileConfig?.experienceYears || '',
          languages: response.data.profileConfig?.languages || '',
          routesOperated: response.data.profileConfig?.routesOperated || ''
        });
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [profile?.id]);

  const handleSave = async () => {
    if (!profile?.id) return;
    setSaving(true);
    setError('');
    
    try {
      await api.put(`/api/driver/${profile.id}/setup`, form);
      setIsEditing(false);
      // Update local state
      setData(prev => prev ? { ...prev, profileConfig: form } : null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  return {
    data,
    loading,
    error,
    isEditing,
    setIsEditing,
    saving,
    form,
    setForm,
    handleSave
  };
}
