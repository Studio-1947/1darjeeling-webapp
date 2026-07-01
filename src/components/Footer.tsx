export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-neutral-800 bg-neutral-950 py-12 px-6 md:px-20 text-sm text-neutral-300 overflow-hidden">
      {/* Grayscale Background Image */}
      <div
        className="absolute inset-0 z-0 grayscale opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url("https://res.cloudinary.com/drgb8w8ak/image/upload/v1782911189/Darjeeling-Toy-Train_1_h8dbp4.webp")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 60%',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Background tint overlay */}
      <div className="absolute inset-0 bg-neutral-950/70 backdrop-blur-[1px] z-10 pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative z-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-semibold !text-white mb-3">Support</h4>
          <ul className="space-y-2 text-xs text-white/80">
            <li><a href="#" className="hover:text-white hover:underline">Help Centre</a></li>
            <li><a href="#" className="hover:text-white hover:underline">AirCover</a></li>
            <li><a href="#" className="hover:text-white hover:underline">Anti-discrimination</a></li>
            <li><a href="#" className="hover:text-white hover:underline">Disability support</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold !text-white mb-3">Hosting</h4>
          <ul className="space-y-2 text-xs text-white/80">
            <li><a href="#" className="hover:text-white hover:underline">Airbnb your home</a></li>
            <li><a href="#" className="hover:text-white hover:underline">AirCover for Hosts</a></li>
            <li><a href="#" className="hover:text-white hover:underline">Hosting resources</a></li>
            <li><a href="#" className="hover:text-white hover:underline">Community forum</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold !text-white mb-3">1darjeeling</h4>
          <ul className="space-y-2 text-xs text-white/80">
            <li><a href="#" className="hover:text-white hover:underline">Newsroom</a></li>
            <li><a href="#" className="hover:text-white hover:underline">New features</a></li>
            <li><a href="#" className="hover:text-white hover:underline">Careers</a></li>
            <li><a href="#" className="hover:text-white hover:underline">Investors</a></li>
          </ul>
        </div>
      </div>
      <div className="relative z-20 max-w-7xl mx-auto mt-10 pt-6 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 space-y-4 md:space-y-0">
        <div>
          &copy; {new Date().getFullYear()} 1darjeeling, Inc. · <a href="#" className="hover:text-white hover:underline">Privacy</a> · <a href="#" className="hover:text-white hover:underline">Terms</a> · <a href="#" className="hover:text-white hover:underline">Sitemap</a>
        </div>
        <div className="flex space-x-4 font-semibold text-neutral-300">
          <span>English (IN)</span>
          <span>₹ INR</span>
        </div>
      </div>
    </footer>
  );
}
