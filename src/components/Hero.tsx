import Typewriter from './Typewriter';

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-75 z-0"
      >
        <source src="/focus.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-t from-canvas to-transparent z-10" />
      <div className="relative z-20 text-center px-6 max-w-3xl select-none">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md mb-4 font-display min-h-[2.5em] md:min-h-[2em]" style={{ color: 'white' }}>
          <Typewriter
            text="Find your perfect stay in the queen of hills"
            speed={40}
            delay={300}
            showCursor={true}
          />
        </h1>
        <p className="text-base md:text-lg text-white/90 max-w-xl mx-auto drop-shadow-sm font-text min-h-[3em]">
          <Typewriter
            text="Explore local homestays, expert drivers, jeep routes, and cozy cafes nestled in the Himalayas."
            speed={20}
            delay={2400}
            showCursor={true}
          />
        </p>
      </div>
    </div>
  );
}
