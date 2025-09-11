import Navbar from "../components/templates/homepage/Navbar.tsx";
import Hero from "../components/templates/homepage/HeroSection.tsx";
import Features from "../components/templates/homepage/Features.tsx";

const Home = () => {
  return (
    <div className="animate-gradient bg-gradient-to-tl from-blue-200 via-white to-purple-200 w-full min-h-screen">
      <Navbar/>
      <div className="flex items-center justify-center flex-col h-[90vh]">
        <Hero/>
        <Features/>
      </div>

    </div>
  );
}

export default Home;