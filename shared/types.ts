// shared/types.ts

export type UserRole = 'USER' | 'HOMESTAY' | 'DRIVER';

export interface UserProfile {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  createdAt?: Date;
}

export interface HomestayProfile {
  id: string;
  email: string;
  propertyName: string;
  gstNumber: string | null;
  essentialsConfig: any | null; 
  createdAt: Date;
}

export interface DriverProfile {
  id: string;
  email: string;
  licenseNumber: string;
  vehicleType: string;
  isAvailable: boolean;
  createdAt: Date;
}

export interface AuthResponse {
  access_token: string;
}
