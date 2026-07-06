// Onboarding questionnaire schema.
// All roles, steps and fields live here — edit this file to change the questions.

export type OnboardingRole = 'driver' | 'homestay' | 'cafe' | 'tourist';

export type FieldType =
  | 'text'
  | 'tel'
  | 'email'
  | 'number'
  | 'textarea'
  | 'select'
  | 'multi'
  | 'radio'
  | 'file'
  | 'toggle';

export interface OnboardingField {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  hint?: string;
  /** file fields: allow selecting more than one */
  multiple?: boolean;
}

export interface OnboardingStep {
  id: string;
  title: string;
  subtitle?: string;
  fields: OnboardingField[];
}

export interface RoleMeta {
  role: OnboardingRole;
  icon: string;
  title: string;
  subtitle: string;
  isProvider: boolean;
}

export const roleOptions: RoleMeta[] = [
  {
    role: 'driver',
    icon: '/driver.svg',
    title: "I'm a Driver / Transport Provider",
    subtitle: 'List your vehicle and routes for tourists',
    isProvider: true,
  },
  {
    role: 'homestay',
    icon: '/homestay.svg',
    title: 'I own a Homestay',
    subtitle: 'List your property and host travellers',
    isProvider: true,
  },
  {
    role: 'cafe',
    icon: '/cafe.svg',
    title: 'I own a Café / Restaurant',
    subtitle: 'Get discovered by hungry travellers',
    isProvider: true,
  },
  {
    role: 'tourist',
    icon: '/traveller.svg',
    title: "I'm a Tourist / Traveler",
    subtitle: 'Find stays, drivers, cafés and experiences',
    isProvider: false,
  },
];

/** Shared first step for all three provider roles. */
const providerCommonStep: OnboardingStep = {
  id: 'common',
  title: 'About you',
  subtitle: 'Basic details we need from every provider',
  fields: [
    { id: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'e.g. Pemba Sherpa' },
    { id: 'phone', label: 'Phone Number', type: 'tel', required: true, placeholder: '10-digit mobile number', hint: 'We will verify this with an OTP' },
    { id: 'email', label: 'Email (optional)', type: 'email', placeholder: 'you@example.com' },
    { id: 'profilePhoto', label: 'Profile Photo', type: 'file' },
    { id: 'address', label: 'Location / Address', type: 'textarea', required: true, placeholder: 'Area, landmark, town', hint: 'Map pin-drop coming soon — describe your location for now' },
    { id: 'govIdType', label: 'Government ID type', type: 'select', required: true, options: ['Aadhaar', 'Voter ID', 'Driving License'] },
    { id: 'govIdUpload', label: 'Government ID upload', type: 'file', required: true },
    { id: 'yearsInBusiness', label: 'Years in business / operation', type: 'number', required: true, placeholder: 'e.g. 5' },
    { id: 'languages', label: 'Preferred language(s)', type: 'multi', required: true, options: ['Nepali', 'Bengali', 'Hindi', 'English'] },
  ],
};

export const onboardingSteps: Record<OnboardingRole, OnboardingStep[]> = {
  driver: [
    providerCommonStep,
    {
      id: 'vehicle',
      title: 'Vehicle details',
      fields: [
        { id: 'vehicleType', label: 'Vehicle type', type: 'select', required: true, options: ['Sedan', 'SUV', 'Shared Jeep', 'Bike'] },
        { id: 'regNumber', label: 'Vehicle registration number', type: 'text', required: true, placeholder: 'e.g. WB-76A-1234' },
        { id: 'regCertificate', label: 'Registration certificate (upload)', type: 'file', required: true },
        { id: 'seats', label: 'Seating capacity', type: 'number', required: true, placeholder: 'e.g. 6' },
        { id: 'vehiclePhotos', label: 'Vehicle photos (front + interior)', type: 'file', multiple: true, required: true },
      ],
    },
    {
      id: 'service',
      title: 'Service details',
      fields: [
        { id: 'licenseNumber', label: 'Driving license number', type: 'text', required: true },
        { id: 'licenseUpload', label: 'Driving license (upload)', type: 'file', required: true },
        {
          id: 'areas',
          label: 'Areas you regularly cover',
          type: 'multi',
          required: true,
          options: ['Darjeeling town', 'Mirik', 'Kalimpong', 'Kurseong', 'Sikkim border runs', 'NJP / Bagdogra transfers', 'Sandakphu / Manebhanjan'],
        },
        {
          id: 'serviceType',
          label: 'Service type',
          type: 'multi',
          required: true,
          options: ['Point-to-point', 'Full-day sightseeing', 'Airport-station transfer', 'Shared rides'],
        },
        { id: 'speaksEnglish', label: 'Do you speak English with tourists?', type: 'toggle' },
        { id: 'availability', label: 'Availability', type: 'radio', required: true, options: ['Full-time', 'Weekends', 'On-call'] },
      ],
    },
    {
      id: 'verification',
      title: 'Verification',
      subtitle: 'These can be added later — your profile will show as "Unverified" until reviewed',
      fields: [
        { id: 'policeVerification', label: 'Police verification certificate (optional)', type: 'file', hint: 'Can be submitted later — status stays "pending"' },
        { id: 'reference', label: 'Reference contact', type: 'text', placeholder: 'Another driver or local business (name + phone)' },
      ],
    },
  ],

  homestay: [
    providerCommonStep,
    {
      id: 'property',
      title: 'Property details',
      fields: [
        { id: 'propertyName', label: 'Property name', type: 'text', required: true },
        { id: 'rooms', label: 'Number of rooms', type: 'number', required: true },
        { id: 'roomTypes', label: 'Room types', type: 'multi', required: true, options: ['Private', 'Shared', 'Dorm'] },
        {
          id: 'amenities',
          label: 'Amenities',
          type: 'multi',
          options: ['WiFi', 'Hot water', 'Parking', 'Mountain view', 'Meals included', 'Bonfire', 'Room heater', 'Power backup'],
        },
        { id: 'priceRange', label: 'Price range per night (₹)', type: 'text', required: true, placeholder: 'e.g. 1200–2500' },
        { id: 'propertyPhotos', label: 'Property photos (min. 5)', type: 'file', multiple: true, required: true },
      ],
    },
    {
      id: 'verification',
      title: 'Verification',
      fields: [
        { id: 'tradeLicense', label: 'Trade license / homestay registration number', type: 'text', hint: 'West Bengal Tourism registration if applicable' },
        { id: 'ownershipProof', label: 'Ownership proof or rental agreement (upload)', type: 'file' },
        { id: 'fssai', label: 'FSSAI license (if serving food)', type: 'file' },
      ],
    },
    {
      id: 'operational',
      title: 'Operations',
      fields: [
        { id: 'checkInOut', label: 'Check-in / check-out policy', type: 'text', placeholder: 'e.g. 12pm check-in, 10am check-out' },
        { id: 'meals', label: 'Meals offered', type: 'radio', required: true, options: ['Breakfast only', 'All meals', 'None'] },
        { id: 'petFriendly', label: 'Pet-friendly?', type: 'toggle' },
        { id: 'familyFriendly', label: 'Family-friendly?', type: 'toggle' },
        { id: 'cancellationPolicy', label: 'Cancellation policy', type: 'textarea', placeholder: 'e.g. Free cancellation up to 48h before check-in' },
      ],
    },
  ],

  cafe: [
    providerCommonStep,
    {
      id: 'business',
      title: 'Business details',
      fields: [
        { id: 'businessName', label: 'Café / restaurant name', type: 'text', required: true },
        {
          id: 'cuisine',
          label: 'Cuisine type',
          type: 'multi',
          required: true,
          options: ['Nepali / Tibetan', 'Bengali', 'North Indian', 'Continental', 'Bakery & Coffee', 'Chinese', 'Multi-cuisine'],
        },
        { id: 'seating', label: 'Seating capacity', type: 'number', required: true },
        { id: 'priceBand', label: 'Price range', type: 'radio', required: true, options: ['₹', '₹₹', '₹₹₹'] },
        { id: 'menuUpload', label: 'Menu (upload)', type: 'file', hint: 'A photo or PDF of your menu' },
        { id: 'photos', label: 'Photos (interior, signature dishes)', type: 'file', multiple: true, required: true },
      ],
    },
    {
      id: 'verification',
      title: 'Verification',
      fields: [
        { id: 'fssaiNumber', label: 'FSSAI license number', type: 'text', required: true },
        { id: 'fssaiUpload', label: 'FSSAI license (upload)', type: 'file', required: true },
        { id: 'tradeLicense', label: 'Trade license (upload)', type: 'file' },
        { id: 'gst', label: 'GST number (optional)', type: 'text' },
      ],
    },
    {
      id: 'operational',
      title: 'Operations',
      fields: [
        { id: 'hours', label: 'Opening hours', type: 'text', required: true, placeholder: 'e.g. 8am – 9pm, closed Tuesdays' },
        { id: 'specialties', label: 'Specialties / must-try items', type: 'textarea', placeholder: 'e.g. Churpee momos, house-roasted coffee' },
        { id: 'serviceMode', label: 'Service', type: 'radio', required: true, options: ['Dine-in', 'Takeaway', 'Both'] },
        { id: 'socialLink', label: 'Instagram or website (optional)', type: 'text', placeholder: 'https://…', hint: 'Helps us cross-verify your business' },
      ],
    },
  ],

  tourist: [
    {
      id: 'trip',
      title: 'Plan your trip',
      subtitle: 'Takes 30 seconds — helps us show you the right stays, drivers and food',
      fields: [
        { id: 'name', label: 'Name', type: 'text', required: true },
        { id: 'contact', label: 'Phone or email', type: 'text', required: true },
        { id: 'arriving', label: 'Arriving', type: 'text', placeholder: 'e.g. 12 Oct' },
        { id: 'departing', label: 'Departing', type: 'text', placeholder: 'e.g. 18 Oct' },
        { id: 'tripType', label: 'Trip type', type: 'radio', options: ['Solo', 'Couple', 'Family', 'Friends group'] },
        {
          id: 'interests',
          label: 'Interests',
          type: 'multi',
          options: ['Trekking', 'Tea gardens', 'Photography', 'Monasteries', 'Local food', 'Toy train', 'Nightlife'],
        },
        { id: 'budget', label: 'Budget range (per day)', type: 'radio', options: ['Under ₹2,000', '₹2,000–5,000', '₹5,000+'] },
        {
          id: 'needs',
          label: 'Do you need…',
          type: 'multi',
          options: ['Transport', 'Stay', 'Guide'],
        },
      ],
    },
  ],
};
