import { useLenis } from "./hooks/useLenis";
/* import Navbar from "./components/Navbar"; */
import CloudCurtain from "./components/CloudCurtain";
import Hero from "./components/Hero";
import About from "./components/About";
import Attractions from "./components/Attractions";
import Stays from "./components/Stays";
import DriversRoutes from "./components/DriversRoutes";
import Produce from "./components/Produce";
import Culture from "./components/Culture";
import TravelTips from "./components/TravelTips";
import Footer from "./components/Footer";

function App() {
  useLenis();

  return (
    <div className="bg-mist">
      {/* <Navbar /> */}
      <main>
        <CloudCurtain />
        <Hero />
        <About />
        <Attractions />
        <Stays />
        <DriversRoutes />
        <Produce />
        <Culture />
        <TravelTips />
      </main>
      <Footer />
    </div>
  );
}

export default App;
