interface CoverPhotoProps {
  propertyName: string;
  location: string;
}

export function CoverPhoto({ propertyName, location }: CoverPhotoProps) {
  return (
    <div className="w-full h-64 md:h-80 rounded-2xl bg-slate-800 overflow-hidden relative shadow-2xl group border border-white/5">
      <img 
        src="https://images.unsplash.com/photo-1542223616-740d5dff7f56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
        alt="Cover" 
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent opacity-90"></div>
      
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex items-end gap-6">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#0F172A] overflow-hidden bg-slate-700 shadow-xl">
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Host" className="w-full h-full object-cover" />
        </div>
        <div className="pb-2">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2 drop-shadow-lg">
            {propertyName || 'Your Homestay Name'}
          </h1>
          <p className="text-slate-300 font-medium flex items-center gap-2 drop-shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[#B48530]">
              <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
            </svg>
            {location || 'Location not set'}
          </p>
        </div>
      </div>
    </div>
  );
}
