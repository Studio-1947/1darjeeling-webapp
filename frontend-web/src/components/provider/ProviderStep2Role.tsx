

interface ProviderStep2RoleProps {
  onSelectRole: (role: string) => void;
}

export default function ProviderStep2Role({ onSelectRole }: ProviderStep2RoleProps) {
  const options = [
    {
      id: 'homestay',
      title: 'Homestay / Hotel',
      description: 'List your property, rooms, and manage bookings.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
        </svg>
      )
    },
    {
      id: 'driver',
      title: 'Driver / Taxi',
      description: 'Register your vehicle and accept ride requests.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      )
    },
    {
      id: 'cafe',
      title: 'Cafe / Restaurant',
      description: 'List your eatery and showcase your best dishes.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
        </svg>
      )
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-ink mb-3">What type of local service do you provide?</h2>
        <p className="text-mute text-lg">Select the category that best fits your business to continue.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onSelectRole(opt.id)}
            className="flex flex-col text-left items-start p-6 bg-canvas border border-mute/20 rounded-xl hover:border-ink hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="p-4 bg-canvas-soft rounded-lg text-[#0a192f] mb-4 group-hover:bg-[#0a192f] group-hover:text-canvas transition-colors">
              {opt.icon}
            </div>
            <h3 className="text-lg font-bold text-ink mb-2">{opt.title}</h3>
            <p className="text-sm text-mute leading-relaxed">{opt.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
