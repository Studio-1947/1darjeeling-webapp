export default function Footer() {
  return (
    <footer className="bg-canvas-soft/85 backdrop-blur-md border-t border-canvas-softer py-12 px-6 md:px-20 text-sm text-ink relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-xs text-body-text">
            <li><a href="#" className="hover:underline">Help Centre</a></li>
            <li><a href="#" className="hover:underline">AirCover</a></li>
            <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
            <li><a href="#" className="hover:underline">Disability support</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Hosting</h4>
          <ul className="space-y-2 text-xs text-body-text">
            <li><a href="#" className="hover:underline">Airbnb your home</a></li>
            <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
            <li><a href="#" className="hover:underline">Hosting resources</a></li>
            <li><a href="#" className="hover:underline">Community forum</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">1darjeeling</h4>
          <ul className="space-y-2 text-xs text-body-text">
            <li><a href="#" className="hover:underline">Newsroom</a></li>
            <li><a href="#" className="hover:underline">New features</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Investors</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-canvas-softer flex flex-col md:flex-row justify-between items-center text-xs text-body-text space-y-4 md:space-y-0">
        <div>
          &copy; {new Date().getFullYear()} 1darjeeling, Inc. · <a href="#" className="hover:underline">Privacy</a> · <a href="#" className="hover:underline">Terms</a> · <a href="#" className="hover:underline">Sitemap</a>
        </div>
        <div className="flex space-x-4 font-semibold text-ink">
          <span>English (IN)</span>
          <span>₹ INR</span>
        </div>
      </div>
    </footer>
  );
}
