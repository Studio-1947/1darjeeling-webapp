import React from 'react';

export default function ProviderRightSidebar() {
  return (
    <aside className="hidden xl:block w-80 py-12 pr-6">
      <div className="bg-[#f2f4f7] rounded-xl p-6 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#0a192f] mb-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
        
        <h3 className="text-xl font-bold text-ink mb-4">Why is this required?</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-ink mb-1">Compliance & Safety</h4>
            <p className="text-sm text-mute leading-relaxed">
              Verification ensures all providers meet our elite standards for high-altitude professional travel services.
            </p>
          </div>
          <div className="h-px w-full bg-hairline my-2"></div>
          <div>
            <h4 className="text-sm font-semibold text-ink mb-1">Global Standards</h4>
            <p className="text-sm text-mute leading-relaxed">
              Your data is handled under strict Privacy Standards, aligning with international compliance policies.
            </p>
          </div>
        </div>
      </div>

      <div className="relative rounded-xl overflow-hidden h-48 group">
        <img 
          src="/provider-mountain.png" 
          alt="Majestic Mountain" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-canvas text-sm font-bold tracking-wide shadow-black drop-shadow-md">
            Trusted by 2,000+ Providers
          </p>
        </div>
      </div>
    </aside>
  );
}
