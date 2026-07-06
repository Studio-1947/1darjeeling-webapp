import { useState, useEffect } from 'react';
import { api } from '../../../api/client';
import { useAuthStore } from '../../../store/authStore';

export function useProfile() {
  const user = useAuthStore((state) => state.profile);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState<{
    propertyName: string;
    email: string;
  }>({ propertyName: '', email: '' });

  const [form, setForm] = useState({
    location: '',
    basePrice: '',
    amenities: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/api/homestay/${user?.id}/profile`);
        const data = res.data;
        setProfile({
          propertyName: data.propertyName,
          email: data.email
        });
        
        const config = data.essentialsConfig || {};
        setForm({
          location: config.location || '',
          basePrice: config.basePrice ? String(config.basePrice) : '',
          amenities: config.amenities ? config.amenities.join(', ') : ''
        });
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) fetchProfile();
  }, [user?.id]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const config = {
        location: form.location,
        basePrice: Number(form.basePrice),
        amenities: form.amenities.split(',').map(a => a.trim()).filter(a => a)
      };
      await api.put(`/api/homestay/${user?.id}/setup`, config);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  return {
    loading,
    saving,
    error,
    isEditing,
    setIsEditing,
    profile,
    form,
    setForm,
    handleSave,
  };
}
